export default [
  {
    title: '应用',
    showMore: false,
    list: [
      {
        component: 'ec-AppCot',
        icon: 'icon-title',
        img: 'https://cdn.yonyoucloud.com/workapplation/icon/7.png',
        label: '常用应用',
        editFile: 'ecAppEdit',
        w: 4,
        h: 3,
        props: {
        }
      },
      {
        component: 'EcWipe',
        icon: 'icon-title',
        img: 'https://ec.diwork.com/front/portal/images/modules/setting/component/FsLongNotice@2x.png',
        label: '轮播图',
        editFile: 'swipeEdit',
        w: 5,
        h: 5,
        props: {
          list: [
            {
              img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fr.bstatic.com%2Fimages%2Fhotel%2Fmax1024x768%2F175%2F17552265.jpg&refer=http%3A%2F%2Fr.bstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635046100&t=b5f5050a338d33ba3fca566017e498fd'
            },
            {
              img: 'https://gd2.alicdn.com/imgextra/i4/0/O1CN01DmkSXG1l1DAvsUxMY_!!0-item_pic.jpg_400x400.jpg'
            }
          ]
        }
      }
    ]
  }
]
