<template>
    <div>
        <div id="main" class="container-fluid">
        <h3 class="page-header">Detalhes {{ book.id }}</h3>

        <el-row>
          <el-col :span="10">
            <el-card class="box-card">
              <div class="text item">
                <p><strong>Id</strong></p>
                  <p>{{ book.id }}</p>
                <p><strong>Título</strong></p>
                  <p>{{ book.titulo }}</p>
                <p><strong>ISBN</strong></p>
                  <p>{{ book.isbn }}</p>
                <p><strong>Emprestado</strong></p>
                  <p>{{ book.emprestado }}</p>
                <p><strong>Número de Páginas</strong></p>
                  <p>{{ book.numPaginas }}</p>
                <p><strong>Valor</strong></p>
                  <p>{{ book.valor }}</p>
              </div>
            </el-card>            
          </el-col>          
        </el-row>
        <hr />        
        <div id="actions" class="row">
            <el-button type="primary" @click.prevet="editBook(book.id)" icon="edit">Editar</el-button>

            <el-popover
              ref="popover5"
              placement="top"
              width="100"
              v-model="visible2">
              <p>Você tem certeza que deseja deletar?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">Cancelar</el-button>
                <el-button type="primary" size="mini" @click.prevent="removeBook(book.id)">Confirmar</el-button>
              </div>
            </el-popover>

            <el-button type="danger" v-popover:popover5 icon="delete">Deletar</el-button>
            <el-button @click.prevent="backToSearch()">
              <i class="el-icon-d-arrow-left"></i>
              Voltar
            </el-button>            
        </div>    
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      visible2: false,
      book: {}
    }
  },
  mounted () {
    let self = this
    self.loadBooks()
  },
  methods: {
    loadBooks () {
      let self = this
      self.$http.get('http://localhost:3000/livros/' + self.$route.params.id)
        .then(
          function (response) {
            self.book = response.body
          },
          function () {
            window.alert('Ocorreu um erro!')
          }
        )
    },
    editBook (id) {
      let self = this
      self.$router.push('/books/edit/' + id)
    },
    backToSearch () {
      let self = this
      self.$router.push('/books/list')
    },
    removeBook (id) {
      let self = this
      self.$http.delete('http://localhost:3000/livros/' + id)
        .then(
          function (response) {
            self.$message({
              message: 'Removido com sucesso!',
              type: 'warning'
            })
            self.$router.push('/books/list')
          }
        )
    }
  }
}
</script>