
// import { hasPermission } from "@/config/utils/permissions"

//获取焦点指令
const focus = {
    bind: function(){
    },
    inserted:function(el){
        el.focus()
    }
}

//组件显示指令
// const displayKey = {
//     inserted(el, binding) {
//         let displayKey = binding.value //value需要在使用指令地方定义
//         if( displayKey ) {
//             !hasPermission(displayKey) && el.parentNode && el.parentNode.removeChild(el);
//             // el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
//         } else {
//             throw new Error (`need Key! Like v-display-key = "'displayKey'"`);
//         }
//     }
// }

//可拖拽指令
//添加子组件拖拽参数 canDrag   v-drag = '"canDragArea"'，  canDrag = 'canDragArea'
const drag = {
    bind(el, binding) {
        let oDiv = el;  // 获取当前元素
        oDiv.onmousedown = e => {
            console.log(e)
            console.log(e.target)
            console.log(e.target.getAttribute('canDrag'))
            console.log(binding.value)
            if(!binding.value || (binding.value == e.target.getAttribute('canDrag'))){
                // 算出鼠标相对元素的位置
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = e => {
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    oDiv.style.left = left + 'px';
                    oDiv.style.top = top + 'px';
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    }
}

//滚动加载指令
/*
<div v-scroll-more="loadSearchMore" :touchHeight = 'scrollOption.touchHeight' style = 'height:200px;overflow:auto;'>
        <div>
            <div v-for="index of list" :key="index">
                这里循环记载展示的列表，div是有滚动条的{{index}}
            </div>
        </div>
    </div>
methods: {
    loadSearchMore () {
      if (!this.loadSign) return
      this.loadSign = false
      this.list += 20
      this.loadSign = true
    // this.pn++
    // if (this.pn <= this.data.pageinfo.pagecount) {
    //   this.loadSign = true
    //   // 把pn传到对应的搜索接口 实现加载下一页 把加载多次得到的list concat
    //   this.search(this.pn)
    // } else {
    // //   console.log("到底了")
    // }
    }
  }

*/
const scrollMore = {
    bind (el, binding) {
      // let bottomOffset = 0
      let touchHeight = el.getAttribute('touchHeight') || 300
      el.addEventListener('scroll', () => {
        if (el.scrollHeight - (el.scrollTop + el.clientHeight) < touchHeight) {
          // 触发指令绑定的函数
          binding.value()
        }
      })
    }
}

// dom滚动指令，
const autoScroll = {
    beforeMount() {},
    mounted(el, binding) {
        let oDiv = el;
        clearInterval(el.scrollTimer);
        el.scrollTimer = setInterval(() => {
            let isOver= oDiv.offsetTop <= oDiv.parentNode.offsetHeight - oDiv.offsetHeight
            oDiv.style.top = isOver? '0px' : (oDiv.offsetTop - binding.value + "px");
        },60);
        oDiv.onmouseenter = function () {
            clearInterval(el.scrollTimer);
		};		
		oDiv.onmouseleave = function () {
            clearInterval(el.scrollTimer);
            el.scrollTimer = setInterval(() => {
                let isOver= oDiv.offsetTop <= oDiv.parentNode.offsetHeight - oDiv.offsetHeight
                oDiv.style.top = isOver? '0px' : (oDiv.offsetTop - binding.value + "px");
            },60);
		};
    },
    unmounted(el) {
        clearInterval(el.scrollTimer);
    },
}

export default {
    focus,
    drag,
    // 'display-key': displayKey,
    'scroll-more': scrollMore,
    'auto-scroll': autoScroll
}