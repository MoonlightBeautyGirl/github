jq(function() {
    var oImg = jq('.img1')[0];
    var oC = document.getElementById('c1');
    var gd = oC.getContext('2d');

    var scale = 2;

    jq('.container img').cropper({
        aspectRatio: 1 / 1,
        preview: '.img-preview',
        crop: function(data) {
            var sx = data.x;
            var sy = data.y;
            var sw = data.width;
            var sh = data.height;

            //生成图形操作
            jq('#btn1').click(function() {
                gd.clearRect(0, 0, oC.width, oC.height);
                gd.drawImage(oImg,
                    sx, sy, sw, sh,
                    0, 0, oC.width, oC.height
                );
            });
        }
    });
});