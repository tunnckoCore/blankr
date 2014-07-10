<html>
    <head>
        <script id="jquerylib" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script src="http://beebole.com/pure/wp-content/themes/BeeBole-pure/libs/pure.js"></script>
        <script src="html2json.js"></script>
        <script>
            //$.get('navbar.html', function (data) {
            //    $('.jsonHTML').html(html2json(data));
            //});
            //var jsonHTML = $('.jsonHTML').val();
            //$('.htmlJSON').val(JSON.parse(jsonHTML));
            $.getJSON('http://web-559b424b-a188-4837-ae1a-55eabf7a48ad.runnable.com/?uri=collection/optional/argumentOne', function (response) {
                $('body').html(JSON.stringify(response));
            });
/*
            $(function() {
                *!GitHub: 1efef65980be4b5655d978f28047be2bc4ee6058
                 * Read JSON Data
                 * METHOD: GET
                 * BACKEND: PHP
                 *
                $.ajax({
                    type: "GET",
                    url: "api/v1/",
                    data: {collection: "test", format: "json", port: "js"},
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $(".response.get").html(JSON.stringify(data));
                        if (data.status == false) {
                            $(".response.get").removeClass('status-yes').addClass('status-no');
                        } else {
                            $(".response.get").removeClass('status-no').addClass('status-yes');
                        }
                    }
                });
                *!
                 * Read JSON Data
                 * METHOD: POST
                 * BACKEND: PHP
                 *
                $.ajax({
                    type: "POST",
                    url: "api/v1/",
                    data: {collection: "dgfg", format: "json"},
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $(".response.post").html(JSON.stringify(data));
                        if (data.status == false) {
                            $(".response.post").removeClass('status-yes').addClass('status-no');
                        } else {
                            $(".response.post").removeClass('status-no').addClass('status-yes');
                        }
                    }
                });
            });
               */
        </script>
        <style>
            .status-yes {
                background: #33cc00;
                color: #fff;
                font-weight: bold;
            }
            .status-no {
                background: #f16022;
                color: #000;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <textarea class="jsonHTML" rows="20" cols="200"></textarea>
        <textarea class="htmlJSON" rows="20" cols="200"></textarea>
        <div id="" class="template" src="">
            Hello <a style="">ahref</a>
            <header href="">header</header>
        </div>
        <script>
            var jsonData = {
                who: 'BeeBole!',
                site: 'http://beebole.com'
            },
            //template commands
            directive = {'a': 'who', 'a@href': 'site'};
            //select the template and transform it
            $('div.template').render(jsonData, directive)
        </script>
    </body>
</html>
