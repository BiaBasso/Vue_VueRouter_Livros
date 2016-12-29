<template>    
<div>
    <div id="main" class="container-fluid">
    <h3 class="page-header" v-show="addLivro">Adicionar Livro</h3>
    <h3 class="page-header" v-show="editLivro">Editar Livro</h3>

    <el-form label-position="top" :model="book" class="demo-form-stacked">
    <el-row :gutter="20">
      <el-col :span="8">        
        <el-form-item label="Título">
          <el-input v-model="book.titulo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="ISBN">
          <el-input v-model="book.isbn"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Emprestado">
          <el-select v-model="book.emprestado">
            <el-option label="Sim" value="Sim"></el-option>
            <el-option label="Não" value="Não"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
         <el-form-item label="Número de Páginas">
          <el-input v-model="book.numPaginas"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Valor">
          <el-input v-model="book.valor"></el-input>
        </el-form-item>
      </el-col>      
    </el-row>
        <hr />
        <div id="actions" class="row">
            <el-form-item>
              <el-button type="primary" @click.prevent="saveBooks()" :disabled="!isValidToSave" :plain="true">
                <i class="el-icon-circle-check"></i>                
                Salvar
              </el-button>
              <el-button @click.prevent="backToSearch()">
                <i class="el-icon-d-arrow-left"></i>
                Voltar
              </el-button>
            </el-form-item>
        </div>
      </el-form>
    </div>
</div>

</template>

<script>
export default {
  data () {
    return {
      addLivro: true,
      editLivro: false,
      book: {
        titulo: '',
        isbn: 0,
        emprestado: '',
        numPaginas: 0,
        valor: 0
      }
    }
  },
  computed: {
    isValidToSave: function () {
      let self = this
      return self.book.titulo &&
        self.book.isbn &&
        self.book.emprestado &&
        self.book.numPaginas &&
        self.book.valor
    }
  },
  mounted () {
    let self = this
    let haveId = self.$route.params.id
    if (haveId) {
      self.addLivro = false
      self.editLivro = true
      self.$http.get('http://localhost:3000/livros/' + self.$route.params.id)
        .then(
          function (response) {
            self.book = response.body
          },
          function (error) {
            console.log(error)
          }
        )
    }
  },
  methods: {
    saveBooks () {
      let self = this
      let haveId = self.$route.params.id
      if (haveId) {
        self.$http.put('http://localhost:3000/livros/' + self.$route.params.id, self.book)
          .then(
            function (response) {
              self.$message({
                message: 'Editado com sucesso!',
                type: 'success'
              })
              self.book = {}
              self.$router.push('/books/list')
            },
            function () {
              window.alert('Ocorreu um erro')
            }
          )
      } else {
        self.$http.post('http://localhost:3000/livros', self.book)
          .then(
            function (response) {
              self.$message({
                message: 'Criado com sucesso!',
                type: 'success'
              })
              self.book = {}
              self.$router.push('/books/list')
            },
            function () {
              window.alert('Ocorreu um erro')
            }
          )
      }
    },
    backToSearch () {
      let self = this
      self.$router.push('/books/list')
    }
  }
}
</script>