function elToggle(cls,id){
    var v = "";
    var h = document.getElementsByClassName(cls);
    [].forEach.call(h,
            function f(el){
                    el.style.display='none';
                }
            );
    document.getElementById(id).style.display='';
}

var paletteNext =0;
var paletteMax =4;
function youDisgustMe(){    //cycles through palettes
    paletteNext<paletteMax?paletteNext++:paletteNext=0; //cycle palette number
    var i=paletteNext;
    let root = document.documentElement;
    root.style.setProperty('--main-bg-color', getComputedStyle(document.body).getPropertyValue('--main-bg-color-'+i));
//root.style.setProperty('--main-bg-color', "#fff");
    root.style.setProperty('--border-color',  getComputedStyle(document.body).getPropertyValue('--border-color-'+i));
    root.style.setProperty('--highlight-color', getComputedStyle(document.body).getPropertyValue('--highlight-color-'+i));
    root.style.setProperty('--nav-bg-color', getComputedStyle(document.body).getPropertyValue('--nav-bg-color-'+i));
    root.style.setProperty('--nav-link-color', getComputedStyle(document.body).getPropertyValue('--nav-link-color-'+i));
}


/*
    https://codepen.io/joxmar/pen/NqqMEg
    highlight menu item on scroll (and smooth scroll on click)
    depends on links using anchor tags, and adds/removes "active" class to their parent element.
    also calculates based on there being a menu fixed to the top, the bottom edge of which defines the point at which the highlighted item changes/to which it scrolls on-click.
    See relevant CSS section in scl.css

*/

//$( document ).ready(function() {

    // Cache selectors
    var lastId,
    topMenu = $("#mainNav"),
    topMenuHeight = $("#mainNav").outerHeight()+1,
    // All list items
    menuItems = topMenu.find("a.hash"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 850);
    e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight+50;
    
    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    
    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#"+id+"]").parent().addClass("active");
    }                   
    });

//});


$(document).ready(function() {

    var $content = $('#mainContent'),
    $nav = $('nav');
    function init() {
        resize();
        $(window).on('resize', resize)
    }

    function resize() {
      topMenuHeight = $("#mainNav").outerHeight()+1,
      $content.css('margin-top',topMenuHeight+"px");
    }  
    init();
  
  });