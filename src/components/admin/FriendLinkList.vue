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
    import tokenName from "@/config/tokenName";
    import friendLinkAPI from "@/api/admin/friendLink";
    import checkerUtil from "@/utils/checker";
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
            }
        },
        methods:{
            submitUpdate(){
                if(checkerUtil.friendLinkChecker(this.friendLink)){
                    friendLinkAPI.updateFriendLink(this.token, this.friendLink).then(
                        ()=>{
                            this.updateDialogDisplay=false
                            this.getFriendLinkList(this.pageNum)
                        },reason => console.error(reason)
                    )
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
                if(checkerUtil.friendLinkChecker(this.friendLink)){
                    friendLinkAPI.addFriendLink(this.token, this.friendLink).then(
                        ()=>{
                            this.addDialogDisplay=false
                            this.getFriendLinkList(this.pageNum)
                        },reason => console.error(reason)
                    )
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
                    friendLinkAPI.deleteFriendLink(this.token, id).then(
                        ()=>{
                            this.getFriendLinkList(this.pageNum)
                        },reason => console.error(reason)
                    )
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
                friendLinkAPI.getFriendLinkList(this.token, pageNum, this.pageSize, this.searchValue, this.orderProperty, this.orderDirection).then(
                    data=>{
                        this.friendLinkList=data.list
                        this.pageNum=pageNum;
                        this.total=data.total;
                        this.friendLinkListLoading=false;
                    },error => console.error(error)
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
        created(){
            this.getToken()
            this.getFriendLinkList(1)
        }
    }
</script>

<style scoped>

</style>