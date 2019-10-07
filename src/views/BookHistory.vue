<template>
    <div>
            <b-table class="history-table" 
            responsive
            hover
            :fields="fields"
            :items="bookHistory"
            >
              <b-link
                slot=" "
                href="#"
                slot-scope="bookHistory"
              >
                <i class="fa fa-info-circle"></i>
              </b-link>
              <template slot="history_user" slot-scope="bookHistory">{{
                bookHistory.item.history_user
              }}</template>
              <template slot="history_date" slot-scope="bookHistory">{{
                bookHistory.item.history_date | moment('LLL') 
              }}</template>
              <template slot="name" slot-scope="bookHistory">{{
                bookHistory.item.name
              }}</template>
            </b-table>
    </div>
</template>

<script>
import { store } from "../Datastore";

export default {
    name: "BookHistory",
    props: ["bookHistory"],
    data() {
        return {
            fields: [
                " ",
                {
                    key: "history_id",
                    label: "History Id"
                },
                {
                    key: "history_date",
                    label: "Date"
                },
                {
                    key: "history_user",
                    label: "History User"
                },
                {
                    key: "name",
                    label: "Name"
                }
            ]
        }
    }
}
</script>
<style>
.history-table {
     max-width: none;
}
</style>