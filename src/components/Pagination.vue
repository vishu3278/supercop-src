<template>
    <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <!-- <a class="pagination-previous">Previous</a> -->
        <ul class="pagination-list">
            <li v-for="(page, index) in totalPages" v-bind:key="index"><a class="pagination-link" v-bind:class="{'is-current':currentPage==page}" v-on:click="$emit('pageChange',page)">{{page}}</a></li>
        </ul>
        <!-- <a class="pagination-next">Next page</a> -->
    </nav>
</template>
<script>
export default {
    name: 'Pagination',
    props: ['totalPages', 'currentPage']
}
</script>