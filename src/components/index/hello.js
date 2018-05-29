// import vue from "vue";
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import './can_co.js'
export default {
  name: "HelloWorld",

  data() {
    return {
      msg: "Welcome to Your Vue.js App123",
      value: ""
    };
  },
  components: {
    mavonEditor
  },
  mounted(){
    // console.log(mavonEditor);
    $.ajax({
      type:'get',
      url:'http://localhost:8080/#/123',
      success:function(data){
      console.log(data);
      },
      error:function(){
      console.log('error');
      }
      })
  }
};
