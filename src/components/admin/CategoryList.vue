<template>
    <div>
        <el-card>
            <h1>分类列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="category.name='';addDialogDisplay=true">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getCategoryList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="categoryList" stripe border @sort-change="orderCategoryList" v-loading="categoryListLoading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-row v-for="(item, idx) in props.row.infoList" v-bind:key=idx>
                            <el-link style="padding: 0.1rem" @click="updateArticle(item.articleId)">{{idx+1}}  {{item.title}}</el-link>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="分类名称" sortable="custom" align="center" prop="name"></el-table-column>
                <el-table-column label="引用次数" sortable="custom" prop="number" align="center"></el-table-column>
                <el-table-column label="创建时间" sortable="custom" prop="createBy" align="center"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="props">
                        <el-button size="small"  @click="updateDialogDisplay=true;category.id=props.row.id;category.name=props.row.name">编辑</el-button>
                        <el-button size="small" v-if="props.row.number==0" class="el-button--danger" @click="deleteCategory(props.row.id)">删除</el-button>
                        <el-button size="small" v-else disabled class="el-button--danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getCategoryList">
        </el-pagination>
<!--        添加分类对话框-->
        <el-dialog :visible.sync="addDialogDisplay" :close-on-click-modal="false" width="30%" title="添加新分类">
            <el-form v-model="category" style="text-align: center">
                <el-form-item label="名称">
                    <el-input v-model="category.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="addCategory">提交</el-button>
                    <el-button @click="addDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
<!--        更新分类对话框-->
        <el-dialog :visible.sync="updateDialogDisplay" :close-on-click-modal="false" width="30%" title="修改分类信息">
            <el-form v-model="category" style="text-align: center">
                <el-form-item label="id">
                    <el-input v-model="category.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="category.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="updateCategory">提交</el-button>
                    <el-button @click="updateDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import categoryAPI from "@/api/admin/category";
    import tokenName from "@/config/tokenName";
    import checkerUtil from "@/utils/checker";
    export default {
        name: "Category",
        data(){
            return{
                //categoryList
                categoryList:[],
                pageNum:1,
                total:0,
                pageSize:5,
                categoryListLoading:false,
                searchValue: '',
                orderProperty:'id',
                orderDirection:'',
                //add
                addDialogDisplay:false,
                //update
                updateDialogDisplay:false,
                category:{
                    id:0,
                    name:'',
                },
            }
        },
        methods:{
            updateArticle(id){
                this.$router.push({name:'articleUpdate',query:{id:id}})
            },
            addCategory(){
                if(checkerUtil.categoryChecker(this.category)) {
                    categoryAPI.addCategory(this.token, this.category).then(()=>{
                        this.addDialogDisplay = false
                        this.getCategoryList(this.pageNum)
                    },reason => console.error(reason))
                }
            },
            updateCategory(){
                if(checkerUtil.categoryChecker(this.category)){
                    categoryAPI.updateCategory(this.token, this.category).then(()=>{
                        this.updateDialogDisplay=false
                        this.getCategoryList(this.pageNum)
                    },reason => console.error(reason))
                }
            },
            deleteCategory(id){
                this.$confirm("此操作将会删除id:"+id+"的分类,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    categoryAPI.deleteCategory(this.token, id).then(()=>{
                        this.getCategoryList(this.pageNum)
                    },reason => console.error(reason))
                }).catch(()=>{})
            },
            orderCategoryList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getCategoryList(this.pageNum);
            },
            getCategoryList(pageNum){
                this.categoryListLoading=true
                categoryAPI.getCategoryList(this.token, pageNum, this.pageSize, this.searchValue, this.orderProperty, this.orderDirection).then(
                    data=>{
                        this.categoryList=data.list;
                        this.total=data.total;
                        this.pageNum=pageNum
                        this.categoryListLoading=false;
                    },reason => console.error(reason)
                )
            },
            getToken(){
                let token=this.$cookies.get(tokenName.admin)
                this.token = token
                if(token==null){
                    this.$router.push("/admin/login")
                }
            }

        },
        created() {
            this.getToken()
            this.getCategoryList(1)
        }
    }
</script>

<style scoped>

</style>