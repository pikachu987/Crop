# Crop

Quick ImageCrop JavaScript

## Example

**Create .html**

**add jQuery.js**

**add cropApi.js**

~~~~


<input type="file" id="file">
<div id="cropArea" style="height: 600px;"></div>
/* cropArea need height */

$(document).ready(function(){
    //input, div, realWidth, realHeight, initRate, rateMinRate, lineColor, lineSize
    CropApi.cropSet($('input[type="file"]'), $('#cropArea'), 670,308, 1, 1/4, '#000000', 10);
    

    $('button:nth-of-type(1)').click(function(){
        var imageSrc = CropApi.cropCapture();
        $('img').attr('src',imageSrc);
    });
    $('button:nth-of-type(2)').click(function(){
        CropApi.rotate();
    });
});

~~~~

## Author

pikachu987, pikachu987@naver.com

## License

Crop is available under the MIT license. See the LICENSE file for more info.
