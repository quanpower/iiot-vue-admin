<template>
  <div>

    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="Link" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.links.self }}
        </template>
      </el-table-column>
      <el-table-column label="Department" width="195" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门名称">
          <el-input type="textarea" v-model="form.departmentName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建部门</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { fetchCategories } from '@/api/flicket'
import { addDepartment } from '@/api/flicket'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null,
      form: {
          departmentName: '',
          region: '',
        } 
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchCategories(1, 30).then(response => {
        console.log('------flicket----------')
        console.log(response.data.items)
        this.list = response.data.items
      })
    },
    onSubmit: function() {  
        // addDepartment(this.inputtext.name); 
        console.log(this.form)
        // addDepartment(this.form.departmentName); 
        addDepartment(this.form)
    }
  }
}
</script>
