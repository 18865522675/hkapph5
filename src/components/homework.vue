<template>
  <div class="workWrap">
			<div class="title">
				{{workName}}
			</div>
			<div class="homCon" >
					<div class="singleList" v-if="dataList.singleList.length">
						<label for="" class="typeName">单选题</label>
						<div class="typeCon">
							<div v-for="(item,index) in dataList.singleList" :key="index">
								<div class="fz13" style="display: flex;">
									<div class="titleCon" style="width:80%">
										{{index+1}} : {{item.exerciseName}}
									</div>
									<div class="kuohao" style="width:20%">
										( {{item.answer|filAnswer(item)}} )
									</div>
								</div>
								<div class="flexBox clear">
									<el-radio v-for="(cItem,cIndex) in item.options" @change="test" v-model="item.answer" class="flexBox" :key="cIndex" :label="cItem.content">{{cIndex|getStringCode }} : {{cItem.content}}</el-radio>
								</div>
							</div>
						</div>
					</div>
					
					<div class="singleList" v-if="dataList.judgeList.length">
						<label for="" class="typeName">判断题</label>
						<div class="typeCon">
							<div v-for="(item,index) in dataList.judgeList" :key="index">
								<div  class="flexBox">
									<div class="titleCon fz13" style="width:80%">
										{{index+1}} : {{item.exerciseName}}
									</div>
									<div class="kuohao fz13" style="width:20%;text-align: right;">
										( {{item.answer|filAnswer(item)}} )
									</div>
								</div>
								<div class="flexBox clear">
									<el-radio v-for="(cItem,cIndex) in item.options" v-model="item.answer"   class="flexItem" :key="cIndex" :label="cItem.id">{{cIndex|getStringCode }} : {{cItem.content}}</el-radio>
								</div>
							</div>
						</div>
					</div>
					
					
					<div class="singleList" v-if="dataList.multiList.length">
						<label for="" class="typeName">多选题</label>
						<div class="typeCon">
							<div v-for="(item,index) in dataList.multiList" :key="index">
								<div  class="flexBox">
									<div class="titleCon fz13" style="width:80%">
										{{index+1}} : {{item.exerciseName}}
									</div>
									<div class="kuohao fz13" style="width:20%;text-align: right;">
										( {{item.answer|filAnswer(item)}} )
									</div>
								</div>
								<div>
									  <el-checkbox-group v-model="item.answer" class="clear">
									  	<div v-for="(cItem,cIndex) in item.options" :key="cIndex">
															 <el-checkbox   :label="cItem.id">{{cIndex|getStringCode }} : {{cItem.content}}</el-checkbox>									  		
									  	</div>
									  </el-checkbox-group>
								</div>
							</div>
						</div>
					</div>
			</div>
			<div style="text-align: center;margin-top:0.12rem;">
				<!--<el-button :disabled="true">确认</el-button>-->
				<el-button class="submitBtn"  v-show="!dialogVisible" @click="isShow">提交</el-button>
				<!--@click="submit"-->
			</div>
			<el-dialog
			  title="确认提交作业 ？"
			  :visible.sync="dialogVisible"
			  width="90%" style='position:absolute!important;bottom:5%!important'>
			  <!--<span>这是一段信息</span>-->
			  <div>
			  	<div>
			    	<el-button  @click="submit" class="tipBtns sureBtn">确 定</el-button>
			    </div>
			    <div style="height: 0.1rem;background:#808080">
			    	
			    </div>
			    <div>
			    	<el-button  class="tipBtns cancelBtn" @click="dialogVisible=false">取 消</el-button>
			    </div>
			  </div>
			</el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'HelloWorld',
  data () {
    return {
      dialogVisible:false,
     	dataList:{
     		singleList:[],
     		multiList:[],
     		judgeList:[]
     	},
     	total:0,
      allAnswerList:[]
    }
  },
  methods:{
  	
  },
  created(){
  	
  },
  mounted(){
  	this.getList()
  },
  computed:{
  	"workId":function(){
  		return this.$route.params.workId
  	},
  	"studentId":function(){
  		return this.$route.params.studentId
  	},
  	"courseId":function(){
  		return this.$route.params.courseId
  	},
  	"workName":function(){
  		return this.$route.params.workName
  	},
  	
  },
 methods:{
 	 getList(){
//	let reqUrl="http://61.153.184.193:8089/autoditacte/study/execise/search";
  		axios({
		  method: 'post',
		  url: 'http://61.153.184.193:8089/autoditacte/study/exercise/search?workId='+this.workId+"&studentId="+this.studentId,
//		  headers:{
//		  	"token":this.token
//		  },
		  data: {
		    currentPage:1,
		    pageNum:200,
		    workId:this.workId,
		    studentId:this.studentId
		  }
	}).then((data)=>{
//			this.dataList=data.data.resultData.results;
				this.total=data.data.resultData.results.length;
//				data.data.resultData.results.push(...data.data.resultData.results)
//				for(let i=0;i<5;i++){
//					data.data.resultData.results.push(...data.data.resultData.results)
//				}
				for(let i of data.data.resultData.results){
					i.answer=[]
					switch(i.typeName){
						case "单选题":this.dataList.singleList.push(i);break;
						case "多选题":this.dataList.multiList.push(i);break;
						case "判断题":this.dataList.judgeList.push(i);break;
					}
				}
		});
},
submit(){
//	alert(123)
		let oAnswers=[...this.dataList.singleList,...this.dataList.multiList,...this.dataList.judgeList];
		let answerList=[];
//		console.log(oAnswers)
		for(let i of oAnswers){
			 let id=i.typeName=="多选题"?i.answer.join(","):i.answer;
			 const obj={
			 		workId:this.workId,
			 		exerciseOptionId:id,
			 		exerciseId:i.exerciseId,
			 		studentId:this.studentId,
			 };
			 answerList.push(obj)
		}
		
//		console.log(JSON.stringify(answerList))
			axios({
		  method: 'post',
		  url: 'http://61.153.184.193:8089/autoditacte/study/exercise/save?courseId='+this.courseId,
		  headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
    	},
		  data:JSON.stringify(answerList)
		}).then((data)=>{
				let mesType,msg;
				
				if(data.data.resultCode==1000){
					mesType="success";
					msg="作业提交成功"
				}else{
					mesType="error";
					msg="作业提交失败"
				}
				if(mesType=="success") this.dialogVisible=false;
				this.showMessage(mesType,msg);
				
		});
},
isShow(){
	let len=[...this.dataList.singleList,...this.dataList.multiList,...this.dataList.judgeList].filter((item,index)=>{
		return item.answer.length>0
	}).length;
//	console.log(len)
	if(len!=this.total){
		return this.showMessage("error","未做完作业，无法提交")
	}
	this.dialogVisible=true;
	
},
showMessage(mesType,msg){
	this.$message({
					type:mesType,
					message:msg,
					center:true,
					showClose:true
				})
},
 },
 filters:{
 	"filAnswer":function(val,kval){
 				const _this=this;
   			if(!val.length){
   				return ""
   			}
			const getZM=(index)=>{
				return String.fromCharCode(index+65);
			}
			
			
			if(kval.typeName=="多选题"){
   				let str=""
   				kval.options.filter((item,index)=>{
   					for(let i of val){
   						if(i==item.id){
								str+=getZM(index)
   						}
   					}
   				})
   				return str
   	}

				for(let i of kval.options){
						if(val==i.id){
								let idx=kval.options.indexOf(i);
								return getZM(idx)
						}
				}
			
			
 	},
 	"getStringCode":function(val){
			return String.fromCharCode(val+65);
		}
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{
		font-size:0.16rem;
	}
	.workWrap{
		padding: 0 0.256rem;
		box-sizing: border-box;
	}
 .title{
 	font-size:0.16rem;
 	padding: 0.2rem 0;
 	text-align: center;
 }
 .typeName{
 	font-size: 0.14rem;
 }
 .fz13{
 	font-size: 0.13rem;
 }
 .submitBtn{
 	padding:0;
 	color:white;
 	background: #348D4D;
 	width:2.6rem;
 	line-height: 0.45rem;
 	
 }
 .typeCon{
 	box-sizing: border-box;
 	padding: 0.1rem 0.13rem;
 }
 .clear:after{
 	display: block;
 	content: "\20";
 	clear: both;
 }
 .homCon{
 	 height: 5rem;
 	 overflow: scroll;
 	 /*background: pink;*/
 }
 .flexBox{
 		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
 }
 .flexItem{
 	 width:50%;
 	 line-height: 0.25rem;
 }
</style>
