<template>
  <div>
    <b-card bg-variant="white">
      <b-tabs v-if="book_id">
        <b-tab title="Book" active>
          <BookDetail
            :book_id="book_id"
            :book="book"
            :isBookNew="isBookNew"
            :isBookImported="isBookImported"
          />
        </b-tab>
        <b-tab title="Export">
          <BookExport :book="book"/>
        </b-tab>
        <b-tab title="History">
          <BookHistory
            :bookHistory="bookHistory"
          />
        </b-tab>
      </b-tabs>
      <BookDetail
        v-if="!book_id"
        :book="book"
        :book_id="book_id"
        :isBookNew="isBookNew"
        :isBookImported="isBookImported"
      />
    </b-card>
  </div>
</template>

<script>
import { store } from "../Datastore";
import BookDetail from "../views/BookDetail";
import BookExport from "../views/BookExport";
import BookHistory from "../views/BookHistory";

export default {
  name: "Book",
  components: {
    BookDetail,
    BookExport,
    BookHistory
  },
  data() {
    return {
      book: null,
      book_id: null,
      isBookNew: false,
      isBookImported: false
    };
  },
  computed: {
    bookHistory: function() {
      return _.sortBy(store.state.bookHistory, "history_id", "desc");
    }
  },
  created: function() {
    store.dispatch("getBookFormats");
    store.dispatch("getContributors");
    store.dispatch("getGames");
    store.dispatch("getPublishers");

    let comp = this;
    let book_id_param = this.$route.params.book_id;
    let page = this.$route.params.page;
    switch (book_id_param) {
      case "new":
        this.isBookNew = true;
        break;
      case "import":
        this.isBookImported = true;
        break;
      default:
        this.book_id = book_id_param;
        store.dispatch({
          type: "getBooks",
          page: page
        }).then(() => {
          this.book = store.state.books.find(d => {
            return d.id === this.book_id;
          });
          if (!this.book) {
            store.dispatch(
              "showError",
              `Book with id '${this.book_id}' not found.`
            );
            router.push("/books");
          } else {
            store.dispatch("getBookHistory", book_id_param);
          }
        });
    }
  }
}
</script>
