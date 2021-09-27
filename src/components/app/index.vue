<template>
  <div class="EcApp-cot">
    <h1 class="EcApp-cot-title">
      {{ title }} <span class="img-cot"> <img src="./img/add.svg" alt=""> </span>
    </h1>
    <div class="EcApp-cot-list">
      <div v-for="(item,key) in list" :key="key" class="EcApp-cot-list-card">
        <img :src="item.img" alt="">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EcAppCot',
  props: {
    title: {
      type: String,
      defaults: '快捷应用'
    }
  },
  data() {
    return {
      list: [
        {
          name: '工作汇报',
          img: 'https://cdn.yonyoucloud.com/pro/workbench/%E6%97%A5%E5%BF%97.png',
          isShow: true,
          sort: 1
        },
        {
          name: '公告',
          img: 'https://cdn.yonyoucloud.com/pro/workbench/%E5%85%AC%E5%91%8A.png',
          isShow: true,
          sort: 2
        },
        {
          name: '我的考勤',
          img: 'https://cdn.yonyoucloud.com/workapplation/icon/5.png',
          isShow: true,
          sort: 3
        },
        {
          name: '任务',
          img: 'https://cdn.yonyoucloud.com/pro/workbench/%E4%BB%BB%E5%8A%A1.png',
          isShow: true,
          sort: 3
        },
        {
          name: '日程',
          img: 'https://cdn.yonyoucloud.com/pro/workbench/%E6%97%A5%E7%A8%8B.png',
          isShow: true,
          sort: 3
        }
      ]
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.EcApp-cot{
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .EcApp-cot-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 14px;
        padding: 16px;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        >.img-cot :hover{
            background-color: #999999;
        }
        >.img-cot{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius:15px;
            img{
                width: 15px;
            }
        }
    }
    .EcApp-cot-list{
        width: 100%;
        display: inline-block;
        padding: 0 16px 16px;
        text-align: left;
        box-sizing: border-box;
        .EcApp-cot-list-card{
            display: inline-block;
            height: 64px;
            width: 75px;
            text-align: center;
            img{
                width: 30px;
                height: 30px;
                margin: 0 auto;
            }
            p{
                margin: -3px 0 0 0;
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }
    }
}
</style>
