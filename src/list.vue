<template>
<div>
    <div id="main" class="container-fluid">
        <h3 class="page-header">Listagem</h3>

        <div id="top" class="row">

            <div class="col-md-3">
                <h3>Livros</h3>
            </div>

            <div class="col-md-6">
              <el-row el-row :gutter="20">
                <el-col :span="8">
                  <el-input
                    class="inline-input"
                    placeholder="Pesquise aqui..."
                    v-model="search">
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="searchEmprestado" placeholder="Selecione">
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" icon="search" @click.prevent="searchBooks">Pesquisar</el-button>
                </el-col>
              </el-row>
            </div>
        </div> <!-- /#top -->

        <hr />
        <div id="list" class="row">

          <el-table
            v-loading.body="loading"
            :data="books">
            <el-table-column
              prop="id"
              label="ID"
              width="70">
            </el-table-column>
            <el-table-column
              prop="titulo"
              label="Título"
              width="350">
            </el-table-column>
            <el-table-column
              prop="isbn"
              label="ISBN"
              width="144">
            </el-table-column>
            <el-table-column
              prop="emprestado"
              label="Emprestado"
              width="145">
            </el-table-column>
            <el-table-column
              prop="numPaginas"
              label="Número de Páginas"
              width="200">
            </el-table-column>
            <el-table-column
              prop="valor"
              label="Valor"
              width="150">
            </el-table-column>
            <el-table-column
              :context="_self"
              inline-template
              label="Ações"
              width="288">
              <div>
                <el-button
                  size="small"
                  @click="detailsBooks(row.id)" icon="information">Detalhes</el-button>
                <el-button
                  size="small"
                  type="info"
                  @click="editBooks(row.id)" icon="edit">Editar</el-button>

                <el-popover
                  ref="popover5"
                  placement="top"
                  width="100"
                  v-model="visible2">
                  <p>Você tem certeza que deseja deletar?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible2 = false">Cancelar</el-button>
                    <el-button type="primary" size="mini" @click.prevent="removeBooks(row.id)">Confirmar</el-button>
                  </div>
                </el-popover>

                <el-button
                  size="small"
                  type="danger"
                  v-popover:popover5 icon="delete">Deletar</el-button>
              </div>
            </el-table-column>
          </el-table>

        </div> <!-- /#list -->

        <div id="bottom" class="row">

            <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[10, 25, 50, 100]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="100">
                </el-pagination>
          </div>

            <!--<pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></pagination>-->

        </div> <!-- /#bottom -->
    </div>
</div>
</template>

<script>
import Pagination from './pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      visible2: false,
      loading: true,
      search: '',
      searchEmprestado: '',
      books: [],
      currentPage4: 1,
      // page: 1,
      // total: 0,
      // itensPerPage: 10,
      options: [{
        value: '',
        label: ''
      }, {
        value: 'Sim',
        label: 'Sim'
      }, {
        value: 'Não',
        label: 'Não'
      }]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange (val) {
      let self = this
      self.currentPage = val
      console.log(`current page: ${val}`)
    },
    // onChangePage (page) {
    //   let self = this
    //   self.page = page
    //   self.loadBooks()
    // },
    loadBooks () {
      let self = this
      let url = 'http://localhost:3000/livros'
      // let q = []
      if (self.search || self.searchEmprestado) {
        url = url + '?'
      }
      if (self.search) {
        url = url + 'titulo=' + self.search
        // q.push('titulo=' + self.search)
      }
      if (self.searchEmprestado) {
        url = url + '&emprestado=' + self.searchEmprestado
        // q.push('emprestado=' + self.searchEmprestado)
        // url = url + q.join('&')
      }
      self.$http.get(url)
        .then(
          function (response) {
            self.loading = false
            self.books = response.body
            self.total = response.headers.get('X-Total-Count')
          },
          function () {
            window.alert('Ocorreu um erro!')
          }
        )
    },
    editBooks (id) {
      let self = this
      self.$router.push('/books/edit/' + id)
    },
    detailsBooks (id) {
      let self = this
      self.$router.push('/books/details/' + id)
    },
    removeBooks (id) {
      let self = this

      self.$http.delete('http://localhost:3000/livros/' + id)
        .then(
          function (result) {
            self.$message({
              message: 'Removido com sucesso!',
              type: 'warning'
            })
            self.loadBooks()
          })
    },
    searchBooks () {
      let self = this
      self.loadBooks()
    }
  },
  mounted () {
    let self = this
    self.loadBooks()
  }
}
</script>
