var CropApi = {};
$(function(){
	//crop setting
	CropApi.cropSet = function(fileTag, divTag, width, height, initRate, minRate, lineColor, lineSize){
		CropApi.fileTag = fileTag;
		CropApi.divTag = divTag;
		CropApi.canvasId = "cropApi_img_canvas";
		CropApi.cropWidth = width;
		CropApi.cropHeight = height;
		CropApi.initRate = initRate;
		CropApi.minRate = minRate;
		CropApi.lineColor = lineColor;
		CropApi.lineSize = lineSize;

		CropApi.fileTag.change(function(){
			var self = $(this);
			var filesSelected = document.getElementById(self.attr('id')).files;
			if (filesSelected.length > 0){
				var fileToLoad = filesSelected[0],fileReader = new FileReader();
				fileReader.onload = function(fileLoadedEvent){
					var src = fileLoadedEvent.target.result;
					self.val('');
					CropApi.initCrop();
					CropApi.imgcrop_init(src);
				};
				fileReader.readAsDataURL(fileToLoad);
			}
		});
	};
	CropApi.rotate = function(){
		CropApi.crop.setRotate(function(){});
	};
	CropApi.cropCapture = function(){
		return CropApi.crop.cropCapture();
	};
	CropApi.removeCrop = function(){
		try{CropApi.crop.removeItem();}catch(e){}
		try{CropApi.crop.remove();}catch(e){}
		CropApi.crop = null;
	};
	CropApi.initCrop = function(){
		CropApi.removeCrop();
		CropApi.crop = new CropApi.cropObj(CropApi.lineColor, CropApi.lineSize );
	};
	CropApi.getGcf = function(tmpValue1, tmpValue2){
		var returnValue = 0;
		var x = 1;
		do{
			if( ((tmpValue1%x) == 0) && ((tmpValue2%x) == 0)) returnValue = x;
			x++;
		}while(x<=Math.min(tmpValue1, tmpValue2));
		return returnValue;
	};

	CropApi.resizeImage = function(rate, src, callback){
		var image = new Image();
		image.onload = function(){
			var width = CropApi.divTag.width();
			var height = CropApi.divTag.height();
			var tmpWidth = width*rate;
			var tmpHeight = height*rate;
			var widthRate = this.width/tmpWidth;
			var heightRate = this.height/tmpHeight;
			var srcWidth = 0, srcHeight = 0;
			if(widthRate > heightRate){
				srcWidth = tmpWidth;
				srcHeight = this.height/widthRate;
			}else{
				srcHeight = tmpHeight;
				srcWidth = this.width/heightRate;
			}
			var tmpcanvas = document.createElement('canvas');
			var tmpctx = tmpcanvas.getContext('2d');
			tmpcanvas.width = srcWidth;
			tmpcanvas.height = srcHeight;
			tmpctx.drawImage(this, 0, 0, srcWidth, srcHeight);
			src = tmpcanvas.toDataURL();
			try{tmpcanvas.remove();}catch(e){}
			try{$(tmpcanvas).remove();}catch(e){}
			try{image.remove();}catch(e){}
			try{$(image).remove();}catch(e){}
			callback(src, width, height);
		};
		image.src = src;
	};


	//imageCrop
	CropApi.imgcrop_init = function(src){
		var tmpCanvas = document.getElementById(CropApi.canvasId);
		try{tmpCanvas.remove();}catch(e){}
		try{$(tmpCanvas).remove();}catch(e){}
		var createCanvas = document.createElement('canvas');
		createCanvas.setAttribute('id',CropApi.canvasId);
		CropApi.divTag.append(createCanvas);

		var resizeClearFn = function(src, width, height){
			var canvas = document.getElementById(CropApi.canvasId);
			var cvContext = canvas.getContext('2d');
			cvContext.clearRect(0, 0, width, height);
			cvContext.beginPath();
			canvas.width = width;
			canvas.height = height;
			var rate = CropApi.getGcf(CropApi.cropWidth, CropApi.cropHeight);
			var rateX = CropApi.cropWidth / rate;
			var rateY = CropApi.cropHeight / rate;
			var offset = CropApi.divTag.offset();
			CropApi.crop.setCanvas(CropApi.canvasId, canvas.width,canvas.height,offset.top,offset.left);
			CropApi.crop.setOriginalImage(src);
			CropApi.crop.initCropImage(
				CropApi.cropWidth*CropApi.minRate,
				CropApi.cropHeight*CropApi.minRate,
				CropApi.cropWidth*CropApi.initRate,
				CropApi.cropHeight*CropApi.initRate,
				rateX,
				rateY,
				CropApi.cropWidth,
				CropApi.cropHeight
			);
		};

		CropApi.resizeImage(4, src, function(src, width, height){
			CropApi.resizeImage(2, src, function(src, width, height){
				CropApi.resizeImage(1, src, resizeClearFn);
			});
		});
	};







	CropApi.cropObj = function(lineColor, lineSize){
		eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 1L=f(){d.26=\'\';d.b=0;d.a=0;d.o=0;d.s=0};4 1H=f(){d.B=2s};4 1I=f(){d.1U=2o;d.b=0;d.a=0;d.i=0;d.j=0;d.D=0;d.C=0;d.o=0;d.s=0;d.Y=0;d.13=0};4 l=H 1L();4 3=H 1I();4 x=H 1H();4 15=\'\';4 A=0;4 t=0;4 1s=0;4 1w=0;4 2q;4 2r;4 X=5;4 y=0;4 z=0;4 E=H 1c();4 1O=H 1c();4 Q=5;4 P=5;4 N=5;4 L=5;4 K=5;4 1i=23;4 1t=5;4 k;d.2p=f(){1o 3};d.2E=f(){1o l};d.2C=f(){1t=q};d.2t=f(2f,9,8,2m,29){15=2f;4 h=J.1r(15);4 g=h.R(\'2d\');7(9!=0)A=9;p A=h.v;7(8!=0)t=8;p t=h.u;1s=29;1w=2m;h.12(\'2u\',2j,5);h.12(\'2v\',2i,q);h.12(\'2w\',1T,5);h.12(\'2x\',2l,5);h.12(\'2D\',2k,q);J.28.12(\'2y\',2e,5);J.28.12(\'2z\',1T,5)};d.2B=f(1f){4 10=H 1c();7(1t)10.2n(\'2A\',\'2I\');10.1G=1f;10.24=f(){4 I=J.1q(\'h\');4 g=I.R(\'2d\');4 r=d.v;4 w=d.u;7(A<r){r=A;w=(r*10.u)/10.v}7(t<w){r=(t*r)/w;w=t}I.v=r;I.u=w;g.1d(10,0,0,d.v,d.u,0,0,r,w);1J(I.1m())}};4 1J=f(1f){E=H 1c();l.26=1f;E.1G=1f;E.24=f(){4 w;4 r;r=d.v;w=d.u;7(A<r){r=A;w=(r*E.u)/E.v}7(d.t<w){r=(t*r)/w;w=t}l.b=A-r;l.a=t-w;l.o=r;l.s=w;7(l.b>0)l.b/=2;7(l.a>0)l.a/=2;3.i=k.i;3.j=k.j;3.D=k.D;3.C=k.C;3.o=k.o;3.s=k.s;3.Y=k.Y;3.13=k.13;3.b=k.b;3.a=k.a;21()}};f 21(){4 h=J.1r(15);4 g=h.R(\'2d\');O(g,h);S(g);7(1i!=23)1i()}d.2R=f(){4 18;4 1F,14;4 1b=J.1q(\'h\');4 22=1b.R(\'2d\');1b.v=A;1b.u=t;O(22,5);14=J.1q(\'h\');1F=14.R(\'2d\');14.v=3.Y;14.u=3.13;1F.1d(1b,3.b,3.a,3.i,3.j,0,0,3.Y,3.13);18=14.1m();1o 18};d.2Q=f(25){1i=25;4 9,8,27=1a.19/2c;4 I=J.1q(\'h\');4 g=I.R(\'2d\');9=E.u;8=E.v;I.v=9;I.u=8;g.1E(0,0,9,8);g.Z();g.2P(9/2,8/2);g.20(2S*27);g.1d(E,-8/2,-9/2);g.2T();1J(I.1m())};d.2W=f(){l=H 1L();3=H 1I();x=H 1H();E=H 1c()};4 O=f(c,h){c.2V(0,0,A,t);c.T();c.1E(0,0,16.17.v(),16.17.u());c.1V=\'#2U\';c.Z();c.T();c.1d(E,0,0,E.v,E.u,l.b,l.a,l.o,l.s);7(h!=2O&&h!=5){1O.1G=h.1m()}7(h!=5){c.T();c.1E(0,0,16.17.v(),16.17.u());c.1V=\'2N(0,0,0,0.6)\';c.Z()}};d.2H=f(1D,1M,1g,1e,1y,1x,1C,1z){k={};k.i=1g;k.j=1e;k.D=1D;k.C=1M;k.o=1y;k.s=1x;k.Y=1C;k.13=1z;k.b=((A-1g)/2);k.a=((t-1e)/2);3.i=1g;3.j=1e;3.D=1D;3.C=1M;3.o=1y;3.s=1x;3.Y=1C;3.13=1z;3.b=((A-1g)/2);3.a=((t-1e)/2)};f M(2g,2b,2h){4 18=0;18=(2g*2h)/2b;1o 18}d.20=f(2a){4 h=J.1r(15);4 g=h.R(\'2d\');g.20(2a*1a.19/2c);O(g);S(g)};4 S=f(c){c.T();4 2G=(16.17.v()-l.o)/2;4 2J=(16.17.u()-l.s)/2;c.1d(1O,3.b,3.a,3.i,3.j,3.b,3.a,3.i,3.j);c.2F=3.1U;c.2K=2;c.2M(3.b,3.a,3.i,3.j);c.1V=3.1U;c.T();c.1j(3.b,3.a,x.B,0,2*1a.19,5);c.1v();c.Z();c.T();c.1j(3.b+3.i,3.a,x.B,0,2*1a.19,5);c.1v();c.Z();c.T();c.1j(3.b,3.a+3.j,x.B,0,2*1a.19,5);c.1v();c.Z();c.T();c.1j(3.b+3.i,3.a+3.j,x.B,0,2*1a.19,5);c.1v();c.Z()};4 1B=f(1u,1p){4 h=J.1r(15);4 g=h.R(\'2d\');4 1X=1u-1s;4 1Z=1p-1w;4 G=y-1X;4 F=z-1Z;4 n=3.b;4 m=3.a;4 9=3.i;4 8=3.j;4 W=l.b;4 U=A-l.b;4 V=l.a;4 11=t-l.a;7(1t==5){W=0;U=A;V=0;11=t}7(Q==q){n=3.b-G;m=3.a-F;7(((n>=W)&&((n+9)<=U))&&((m>=V)&&((m+8)<=11))){3.b=n;3.a=m;O(g);S(g)}}p 7(P==q){n=3.b-G;m=3.a-F;9=3.i+G;8=3.j+F;7((9<=3.D)||(8<=3.C)){9=3.D;8=3.C}p{7(3.o!=-1){7(G>F)8=M(9,3.o,3.s);p 9=M(8,3.s,3.o)}}n=3.b+(3.i-9);m=3.a+(3.j-8);7(((n>=W)&&((n+9)<=U))&&((m>=V)&&((m+8)<=11))){3.b=n;3.a=m;3.i=9;3.j=8;O(g);S(g)}}p 7(N==q){m=3.a-F;9=3.i-G;8=3.j+F;7((9<=3.D)||(8<=3.C)){9=3.D;8=3.C}p{7(3.o!=-1){7(G>F)8=M(9,3.o,3.s);p 9=M(8,3.s,3.o)}}m=3.a+(3.j-8);7(((n>=W)&&((n+9)<=U))&&((m>=V)&&((m+8)<=11))){3.b=n;3.a=m;3.i=9;3.j=8;O(g);S(g)}}p 7(L==q){n=3.b-G;9=3.i+G;8=3.j-F;7((9<=3.D)||(8<=3.C)){9=3.D;8=3.C}p{7(3.o!=-1){7(G>F)8=M(9,3.o,3.s);p 9=M(8,3.s,3.o)}}n=3.b+(3.i-9);7(((n>=W)&&((n+9)<=U))&&((m>=V)&&((m+8)<=11))){3.b=n;3.a=m;3.i=9;3.j=8;O(g);S(g)}}p 7(K==q){9=3.i-G;8=3.j-F;7((9<=3.D)||(8<=3.C)){9=3.D;8=3.C}p{7(3.o!=-1){7(G>F)8=M(9,3.o,3.s);p 9=M(8,3.s,3.o)}}7(((n>=W)&&((n+9)<=U))&&((m>=V)&&((m+8)<=11))){3.b=n;3.a=m;3.i=9;3.j=8;O(g);S(g)}}y=1X;z=1Z};f 2k(e){e.1n();7(X==q)1B(e.1h,e.1k)}f 2i(e){e.1n();7(X==q)1B(e.1l[0].1h,e.1l[0].1k)}f 2l(e){X=q;e.1n();1P(e.1h,e.1k)}f 2j(e){X=q;e.1n();1P(e.1l[0].1h,e.1l[0].1k)}f 2e(e){X=5;Q=5;P=5;N=5;L=5;K=5}f 1T(e){X=5;Q=5;P=5;N=5;L=5;K=5}f 1P(1u,1p){y=1u-1s;z=1p-1w;4 2L=(x.B/2);4 1S=3.b-x.B;4 1R=3.b+x.B;4 1Q=(3.b+3.i)-x.B;4 1W=(3.b+3.i)+x.B;4 1A=3.a-x.B;4 1N=3.a+x.B;4 1Y=(3.a+3.j)-x.B;4 1K=(3.a+3.j)+x.B;7(((1S<y)&&(1R>y))&&((1A<z)&&(1N>z))){Q=5;P=q;N=5;L=5;K=5}p 7(((1Q<y)&&(1W>y))&&((1A<z)&&(1N>z))){Q=5;P=5;N=q;L=5;K=5}p 7(((1S<y)&&(1R>y))&&((1Y<z)&&(1K>z))){Q=5;P=5;N=5;L=q;K=5}p 7(((1Q<y)&&(1W>y))&&((1Y<z)&&(1K>z))){Q=5;P=5;N=5;L=5;K=q}p 7(((3.b<=y)&&((3.b+3.i)>=y))&&((3.a<=z)&&((3.a+3.j)>=z))){Q=q;P=5;N=5;L=5;K=5}}',62,183,'|||mCropImgSt|var|false||if|tmpHeight|tmpWidth|mY|mX|tmpContext|this||function|cvContext|canvas|mWidth|mHeight|tmpCropOri|mBasicImgSt|tmpY|tmpX|mRateWidth|else|true|rateWidth|mRateHeight|mCanvasHeight|height|width|rateHeight|mCropVertextSt|mTouchStartX|mTouchStartY|mCanvasWidth|mWidthHeight|mMinHeight|mMinWidth|mOrgImage|moveY|moveX|new|tmpCanvas|document|isRightBottomResize|isLeftBottomResize|getRateLength|isRightTopResize|drawBasicImage|isLeftTopResize|isMove|getContext|drawCropImage|beginPath|limitX2|limitY1|limitX1|mIsTouch|mResultWidth|fill|tempImage|limitY2|addEventListener|mResultHeight|temp_canvas|mCanvasId|CropApi|divTag|returnValue|PI|Math|mOriginalCanvase|Image|drawImage|tmpBasicHeight|tmpSrc|tmpBasicWidth|pageX|showsCompleteFunction|arc|pageY|targetTouches|toDataURL|preventDefault|return|tmpCanvasY|createElement|getElementById|mCanvasOffsetLeft|map|tmpCanvasX|closePath|mCanvasOffsetTop|tmpRateHeight|tmpRateWidth|tmpResultHeight|vtTpYTop|showPos|tmpResultWidth|tmpMinWidth|rect|temp_ctx|src|CropVertextSt|CropImageSt|initRotateImage|vtBtYBottom|BasicImageSt|tmpMinHeight|vtTpYBottom|mResizeImage|isAction|vtRiXLeft|vtLeXRight|vtLeXLeft|touchUp|mLineColor|fillStyle|vtRiXRight|offsetX|vtBtYTop|offsetY|rotate|initShow|mOriginalCtx|null|onload|tmpFunction|mSrc|TO_RADIANS|body|offsetLeft|degrees|tmpStandardRate|180||mouseUp|tmpCanvasId|tmpStandardLength|tmpRate|touchXY|touchDown|mouseXY|mouseDown|offsetTop|setAttribute|lineColor|cropInfo|mCanvas|mCvContext|lineSize|setCanvas|touchstart|touchmove|touchend|mousedown|mouseup|touchcancel|crossOrigin|setOriginalImage|isMap|mousemove|basicImageInfo|strokeStyle|widthGap|initCropImage|anonymous|heightGap|lineWidth|vertextWidthHeightHalf|strokeRect|rgba|undefined|translate|setRotate|cropCapture|90|restore|ffffff|clearRect|removeItem'.split('|'),0,{}))

	};
});
