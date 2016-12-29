<template>
    <div class="col-md-12">         
        <ul class="pagination">
            <li class="previous">
                <a rel="previous" v-show="showPreviousButton" @click="goPreviousPage()">&lt; Anterior</a>
            </li>
            <li>
                <a v-show="showPreviousButton" @click="goFirstPage()">1</a>
            </li>
            <li>
              <span v-show="showPreviousButton">...</span>
            </li>
            <li>
                <a v-show="showPreviousButton" @click="goPage(page - 1)">{{ page - 1 }}</a>
            </li>
            <li>
                <span>{{ page }}</span>
            </li>
            <li>
                <a v-show="showNextButton" @click="goPage(page + 1)">{{ page + 1 }}</a>
            </li>
            <li>
              <span v-show="showNextButton">...</span>
            </li>
            <li>
                <a v-show="showNextButton" @click="goLastPage()">{{ totalPages}}</a>
            </li>
            <li class="next">
                <a rel="next" v-show="showNextButton" @click="goNextPage()">Próximo &gt;</a>
            </li>
        </ul> 
    </div>
</template>

<script>
export default {
  props: ['total', 'page', 'itensPerPage'],
  computed: {
    totalPages: function () {
      let self = this
      return Math.ceil(self.total / self.itensPerPage)
    },
    showNextButton: function () {
      let self = this
      return self.page !== self.totalPages
    },
    showPreviousButton: function () {
      let self = this
      return self.page !== 1
    }
  },
  methods: {
    goNextPage: function () {
      let self = this
      self.$emit('chance-page', self.page + 1)
    },
    goPreviousPage: function () {
      let self = this
      self.$emit('change-page', self.page - 1)
    },
    goFirstPage: function () {
      let self = this
      self.$emit('change-page', 1)
    },
    goLastPage: function () {
      let self = this
      self.$emit('change-page', self.totalPages)
    },
    goPage: function (page) {
      let self = this
      self.$emit('change-page', page)
    }
  }
}
</script>