<template>
    <div>
        <el-card>
            <h1>友链列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="addFriendLink">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getFriendLinkList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="friendLinkList" stripe border @sort-change="orderFriendLinkList" v-loading="friendLinkListLoading">
                <el-table-column label="id" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="名称" prop="name" align="center"></el-table-column>
                <el-table-column label="地址" prop="url" align="center"></el-table-column>
                <el-table-column label="添加时间" prop="createBy" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="props">
                        <el-button size="small" @click="updateFriendLink(props.$index)">编辑</el-button>
                        <el-button size="small" class="el-button--danger" @click="deleteFriendLink(props.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination :page-size="pageSize"
                       :current-page="pageNum"
                       :total="total"
                       @current-change="getFriendLinkList">

        </el-pagination>
<!--        添加-->
        <el-dialog width="50%" title="添加友链" :close-on-click-modal="false" :visible.sync="addDialogDisplay">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="friendLink.name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="friendLink.url"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button class="el-button--primary" @click="submitAdd">提交</el-button>
                <el-button @click="addDialogDisplay=false">取消</el-button>
            </div>
        </el-dialog>
<!--        更新-->
        <el-dialog width="50%" title="修改友链" :close-on-click-modal="false" :visible.sync="updateDialogDisplay">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="friendLink.name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="friendLink.url"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button class="el-button--primary" @click="submitUpdate">提交</el-button>
                <el-button @click="updateDialogDisplay=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import{Notification} from 'element-ui'
    export default {
        name: "FriendLinkList",
        data(){
            return{
                //friendList
                friendLinkList:[],
                friendLinkListLoading:false,
                pageNum:1,
                pageSize:5,
                total:0,
                searchValue:'',
                orderProperty:'id',
                orderDirection:'asc',
                //dialog
                addDialogDisplay:false,
                updateDialogDisplay:false,
                //friendLink
                friendLink:{
                    id:0,
                    name:'',
                    logoUrl:'',
                    url:''
                },
                //headerConfig
                headerConfig:{
                    headers:{
                        Authorization:''
                    }
                }
            }
        },
        methods:{
            submitUpdate(){
                if(this.friendLink.name==''){
                    this.$message({
                        message:'名称不能为空！',
                        type:'warning'
                    })
                }else if(this.friendLink.url==''){
                    this.$message({
                        message:'地址不能为空！',
                        type:'warning'
                    })
                }else{
                    let url=this.baseUrl+"/admin/friend/link"
                    axios.put(url,this.friendLink,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'更新友链成功！',
                                type:'success'
                            })
                            this.getFriendLinkList(this.pageNum)
                            this.updateDialogDisplay=false;
                        }else{
                            Notification({
                                title:'提示',
                                message:'更新友链失败！',
                                type:'error'
                            })
                        }
                    })
                }
            },
            updateFriendLink(index){
                let item=this.friendLinkList[index]
                this.friendLink.id=item.id
                this.friendLink.name=item.name
                this.friendLink.url=item.url
                this.updateDialogDisplay=true
            },
            submitAdd(){
                if(this.friendLink.name==''){
                    this.$message({
                        message:'名称不能为空！',
                        type:'warning'
                    })
                }else if(this.friendLink.url==''){
                    this.$message({
                        message:'地址不能为空！',
                        type:'warning'
                    })
                }else{
                    let url=this.baseUrl+"/admin/friend/link"
                    axios.post(url,this.friendLink,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'添加友链成功！',
                                type:'success'
                            })
                            this.getFriendLinkList(this.pageNum)
                            this.addDialogDisplay=false;
                        }else{
                            Notification({
                                title:'提示',
                                message:'添加友链失败！',
                                type:'error'
                            })
                        }
                    })
                }
            },
            addFriendLink(){
                this.friendLink.url=''
                this.friendLink.logoUrl=''
                this.friendLink.name=''
                this.addDialogDisplay=true;
            },
            deleteFriendLink(id){
                this.$confirm('即将删除id：'+id+'的友链，且不可恢复！','提示',{
                    showConfirmButton:true,
                    showCancelButton:true,
                    type:'warning',
                }).then(()=>{
                    let url=this.baseUrl+"/admin/friend/link?id="+id
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'删除友链成功！',
                                type:'success'
                            })
                            this.getFriendLinkList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'删除友链失败！',
                                type:'error'
                            })
                        }
                    })
                }).catch(()=>{})
            },
            orderFriendLinkList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getFriendLinkList(1);
            },
            getFriendLinkList(pageNum){
                this.friendLinkListLoading=true;
                let url=this.baseUrl+"/admin/friend/link/list?pageNum="+ pageNum+
                    "&pageSize="+ this.pageSize+
                    "&searchValue="+ this.searchValue+
                    "&orderProperty="+this.orderProperty+
                    "&orderDirection="+this.orderDirection
                axios.get(url,this.headerConfig).then(res=>{
                    let result= res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.friendLinkList=data.list
                        this.pageNum=pageNum;
                        this.total=data.total;
                        this.friendLinkListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取友链列表失败！',
                            type:'error'
                        })
                    }
                })

            },
            getToken(){
                let token=this.$cookies.get("zBlogAdminToken")
                if(token!=null){
                    this.headerConfig.headers.Authorization=token
                }else{
                    this.$router.push("/admin/login")
                }
            }

        },
        created(){
            this.getToken()
            this.getFriendLinkList(1)
        }
    }
</script>

<style scoped>

</style>