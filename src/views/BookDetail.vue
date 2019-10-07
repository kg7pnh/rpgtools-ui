<template>
  <div :class="pageStatus">
    <label for="book-name">Name</label>
    <i class="fa fa-asterisk required"></i>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-name"
        type="text"
        v-model="name"
        v-focus
        @input="validateBook"
      />
      <b-form-invalid-feedback id="book-name-validation">Enter at least 4 characters</b-form-invalid-feedback>
    </b-input-group>
    
    <label for="book-name">Description</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-description"
        type="text"
        v-model="description"
        @input="validateBook"
      />
    </b-input-group>
    
    <label for="book-name">Short Name</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-short-name"
        type="text"
        v-model="short_name"
        @input="validateBook"
      />
    </b-input-group>
    
    <label for="book-name">Abbreviation</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-abbreviation"
        type="text"
        v-model="abbreviation"
        @input="validateBook"
      />
    </b-input-group>
    
    <label for="book-name">Catalog Number</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-catalog-number"
        type="text"
        v-model="catalog_number"
        @input="validateBook"
      />
    </b-input-group>
    
    <label for="book-name">Pages</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-pages"
        type="number"
        v-model="pages"
        @input="validateBook"
      />
    </b-input-group>
    
    <label for="book-name">ISBN-10</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-isbn-10"
        type="text"
        v-model="isbn_10"
        pattern="^(?:ISBN(?:10)?(?:-10)?\x20)?[0-9]{9}(\d|X)$"
        @input="validateBook"
      />
      <b-form-invalid-feedback id="book-isbn-10-validation">Enter a valid ISDN-10 value</b-form-invalid-feedback>
    </b-input-group>
    
    <label for="book-name">ISBN-13</label>
    <b-input-group class="book-form-input">
      <b-form-input
        id="book-isbn-13"
        type="text"
        v-model="isbn_13"
        pattern="^(?:ISBN(?:13)?(?:-13)?\x20)?:?97(?:8|9)[0-9]{10}$"
        @input="validateBook"
      />
      <b-form-invalid-feedback id="book-isbn-13-validation">Enter a valid ISDN-13 value</b-form-invalid-feedback>
    </b-input-group>
    
    <div>
      <b-button
        :disabled="(!bookValid)"
        type="submit"
        variant="primary"
        @click="saveBook()"
      >Save</b-button>
    </div>
  </div>
</template>

<script>
import { store } from "../Datastore";
import router from "../router/index";
import _ from "lodash";
import $ from "jquery";
import naturalCompare from "natural-compare";

export default {
  name: "BookDetail",
  props: ["book_id", "isBookNew", "isBookImported", "book"],
  data() {
      return {
          name: "New Book",
          short_name: "",
          abbreviation: "",
          catalog_number: "",
          pages: "",
          isbn_10: "",
          isbn_13: "",
          book_format: null,
          game: null,
          publisher: null,
          description: "",
          bookValid: false
      };
  },
  methods: {
    validateBook() {
      this.isbn10Valid = !$("#book-isbn-10")[0] ? false : $("#book-isbn-10")[0].checkValidity();
      this.isbn13Valid = !$("#book-isbn-13")[0] ? false : $("#book-isbn-13")[0].checkValidity();
      this.bookValid =
        this.isbn10Valid &&
        this.isbn13Valid;
    },
    saveBook() {
      alert(this.book);
    },
    loadBook: function(book) {
      let vm = this;
      vm.name = book.name;
      vm.short_name = book.short_name;
      vm.abbreviation = book.abbreviation;
      vm.description = book.description;
      vm.catalog_number = book.catalog_number;
      vm.pages = book.pages;
      vm.isbn_10 = book.isbn_10;
      vm.isbn_13 = book.isbn_13;
      vm.book_format = book.book_format;
      vm.game = book.game;
      vm.publisher = book.publisher;
      vm.art_assistant = book.art_assistant;
      vm.art_director = book.art_director;
      vm.artist_cover = book.artist_cover;
      vm.artist_interior = book.artist_interior;
      vm.author = book.author;
      vm.designer = book.designer;
      vm.developer = book.developer;
      vm.editor = book.editor;
      vm.graphic_designer = book.graphic_designer;
      vm.workflow = book;
      vm.isBookLoaded = true;
      this.validateBook();
    }
  },
  computed: {
    bookFormats: function() {
      return store.state.bookFormats
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) =>
        naturalCompare(a.name, b.name));
    },
    contributors: function() {
      return store.state.contributors
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    games: function() {
      return store.state.games
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    publishers: function() {
      return store.state.publishers
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    books: function() {
        return store.state.books;
    },
    pageStatus: function() {
      return
        this.isBookImported || this.isBookNew || this.isBookLoaded
          ? true
          : false
    }
  },
  watch: {
    book: function() {
      if (!this.isBookImported && !!this.book) {
        this.loadBook(this.book);
      }
    }
  },
  mounted: function() {
    if (this.isBookImported) {
      this.loadBook(store.state.importedBook);
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        if (el.value && el.value !== "") {
          el.select();
        }
        el.focus();
      }
    }      
  }
}
</script>

<style>
.book-form-input {
  margin-right: 15px;
  margin-bottom: 15px;
}
.required {
  color: red;
  vertical-align: super;
  font-size: 5pt;
  margin-left: 2px;
}
</style>
