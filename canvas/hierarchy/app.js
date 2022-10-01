const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json';

/* globals d3 */
(async function () {
  const data = await (await fetch(dataSource)).json();
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack()
    .size([1600, 1600])
    .padding(3);

  const root = pack(regions);
  // console.log(root, "root");

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const TAU = 2 * Math.PI;

  function draw(ctx, node, {
    fillStyle = 'rgba(0, 0, 0, 0.2)',
    textColor = 'white'
  } = {}) {
    const children = node.children;
    const {
      x,
      y,
      r
    } = node;
    ctx.fillStyle = fillStyle; //这里的背景色会堆叠
    ctx.beginPath(); //开始一条新的路径，不然旧路径的样式会沿用新路径的样式，这里是文字和圆，不冲突，所以没开启新的路径
    ctx.arc(x, y, r, 0, TAU); //TAU为直径时，画出来是圆
    ctx.fill();
    //填充颜色
    if (children) {
      for (let i = 0; i < children.length; i++) {
        draw(context, children[i]);
      }
  

    } else {
      const name = node.data.name;
      // console.log(name);
      console.log("2");
      ctx.fillStyle = textColor;
      ctx.font = '1.5rem Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y);
    }
    console.log("xin");
  }

  draw(context, root);
}());