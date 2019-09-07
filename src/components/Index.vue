<template>
    <div class="pt-5">
        <div v-if="books && books.length">
            <div class="card mb-3" v-for="book of books" v-bind:key="book.id">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <svg class="bd-placeholder-img" width="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>{{ book.name }}</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ book.name.charAt(0) }}</text></svg>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ book.name }}</h5>
                            <p class="card-text">{{ book.description }}</p>
                            <router-link :to="{name: 'edit', params: { id: book.id }}" class="btn btn-sm btn-primary">Edit</router-link>
                            <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteBook(book)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p  v-if="books.length == 0">No books found...</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "book",
    data() {
        return {
            books: []
        }
    },
    created() {
        this.all();
    },
    methods: {
        deleteBook: function(book) {
            if (confirm('Delete ' + book.name)) {
                axios.delete(`http://127.0.0.1:8000/api/books/${book.id}`)
                    .then( response => {
                        this.all();
                    });
            }
        },
        all: function () {
            axios.get('http://127.0.0.1:8000/api/v1/books')
                .then( response => {
                    this.books = response.data
                });
        }
    },
}
</script>