<template>
    <div>
        <el-card>
            <h1>标签列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="tag.name='';addDialogDisplay=true">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getTagList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="tagList" stripe border @sort-change="orderTagList" v-loading="tagListLoading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.infoList" stripe border>
                            <el-table-column width="800" label="标题">
                                <template slot-scope="child_props">
                                    <el-link style="padding: 0.1rem" @click="updateArticle(child_props.row.articleId)">{{child_props.row.title}}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column width="100" label="操作">
                                <template slot-scope="child_props">
                                    <el-button type="danger" size="mini" @click="deleteArticleTag(child_props.row.title, child_props.row.articleId, props.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="标签名称" sortable="custom" align="center" prop="name"> </el-table-column>
                <el-table-column label="引用次数" sortable="custom" prop="number" align="center"></el-table-column>
                <el-table-column label="创建时间" sortable="custom" prop="createBy" align="center"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="props">
                        <el-button size="small"  @click="updateDialogDisplay=true;tag.id=props.row.id;tag.name=props.row.name">编辑</el-button>
                        <el-button size="small" v-if="props.row.number==0" class="el-button--danger" @click="deleteTag(props.row.id)">删除</el-button>
                        <el-button size="small" v-else disabled class="el-button--danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getTagList">
        </el-pagination>
        <!--        添加标签对话框-->
        <el-dialog :visible.sync="addDialogDisplay" :close-on-click-modal="false" width="30%" title="添加新标签">
            <el-form v-model="tag" style="text-align: center">
                <el-form-item label="名称">
                    <el-input v-model="tag.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="addTag">提交</el-button>
                    <el-button @click="addDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--        更新标签对话框-->
        <el-dialog :visible.sync="updateDialogDisplay" :close-on-click-modal="false" width="30%" title="修改标签信息">
            <el-form v-model="tag" style="text-align: center">
                <el-form-item label="id">
                    <el-input v-model="tag.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="tag.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="updateTag">提交</el-button>
                    <el-button @click="updateDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import tokenName from "@/config/tokenName";
    import tagAPI from "@/api/admin/tag";
    import checkerUtil from "@/utils/checker";
    export default {
        name: "TagList",
        data(){
            return{
                //tagList
                tagList:[],
                pageNum:1,
                total:0,
                pageSize:5,
                tagListLoading:false,
                searchValue: '',
                orderProperty:'id',
                orderDirection:'',
                //add
                addDialogDisplay:false,
                //update
                updateDialogDisplay:false,
                tag:{
                    id:0,
                    name:'',
                },
            }
        },
        methods:{
            deleteArticleTag(title, articleId, tagId){
                this.$confirm("此操作将会删除日志"+title+"对该标签的引用,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then(()=>{
                    tagAPI.deleteArticleTag(this.token, title, articleId, tagId).then(()=>{
                        this.getTagList(1)
                    }, reason => console.error(reason))
                })
            },
            updateArticle(id){
                this.$router.push({name:'articleUpdate',query:{id:id}})
            },
            addTag(){
                if(checkerUtil.tagChecker(this.tag)){
                    tagAPI.addTag(this.token, this.tag).then(
                        ()=>{
                            this.addDialogDisplay=false
                            this.getTagList(this.pageNum)
                        },reason => console.error(reason)
                    )
                }
            },
            updateTag(){
                if(checkerUtil.tagChecker(this.tag)){
                    tagAPI.updateTag(this.token, this.tag).then(
                        ()=>{
                            this.updateDialogDisplay=false
                            this.getTagList(this.pageNum)
                        },reason => console.error(reason)
                    )
                }
            },
            deleteTag(id){
                this.$confirm("此操作将会删除id:"+id+"的标签,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then(()=>{
                    tagAPI.deleteTag(this.token, id).then(()=>{
                        this.getTagList(this.pageNum)
                    },reason => console.error(reason))
                })
            },
            orderTagList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getTagList(1);
            },
            getTagList(pageNum){
                this.tagListLoading=true
                tagAPI.getTagList(this.token, pageNum, this.pageSize, this.searchValue, this.orderProperty, this.orderDirection).then(
                    data=>{
                        this.tagList=data.list;
                        this.total=data.total;
                        this.pageNum=pageNum
                        this.tagListLoading=false;
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
            this.getToken();
            this.getTagList(1)
        }
    }
</script>

<style>
    .table-button-container{
        padding-bottom: 20px;
    }
</style>