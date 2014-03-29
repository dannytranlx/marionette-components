define([
    'jquery',
    'docs/assets/js/bootstrap'
], function(
    $
) {
    $(function() {

        // IE10 viewport hack for Surface/desktop Windows 8 bug
        //
        // See Getting Started docs for more information
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style')
            msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            )
            document.querySelector('head').appendChild(msViewportStyle)
        }


        var $window = $(window)
        var $body = $(document.body)

        var navHeight = $('.navbar').outerHeight(true) + 10

        $body.scrollspy({
            target: '.bs-docs-sidebar',
            // offset: navHeight
        })

        $window.on('load', function() {
            $body.scrollspy('refresh')
        })

        $('.bs-docs-container [href=#]').click(function(e) {
            e.preventDefault()
        })

        // back to top
        setTimeout(function() {
            var $sideBar = $('.bs-docs-sidebar')

            $sideBar.affix({
                offset: {
                    top: function() {
                        var offsetTop = $sideBar.offset().top
                        var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
                        var navOuterHeight = $('.bs-docs-nav').height()

                        return (this.top = offsetTop - navOuterHeight - sideBarMargin)
                    },
                    bottom: function() {
                        return (this.bottom = $('.bs-docs-footer').outerHeight(true))
                    }
                }
            })
        }, 100)

        setTimeout(function() {
            $('.bs-top').affix()
        }, 100)

        // tooltip demo
        $('.tooltip-demo').tooltip({
            selector: '[data-toggle=tooltip]',
            container: 'body'
        })

        $('.tooltip-test').tooltip()
        $('.popover-test').popover()

        $('.bs-docs-navbar').tooltip({
            selector: 'a[data-toggle=tooltip]',
            container: '.bs-docs-navbar .nav'
        })

        // popover demo
        $('.bs-docs-popover').popover()

        // Popover dismiss on next click
        $('.bs-docs-popover-dismiss').popover({
            trigger: 'focus'
        })

        // button state demo
        $('#loading-example-btn')
            .click(function() {
                var btn = $(this)
                btn.button('loading')
                setTimeout(function() {
                    btn.button('reset')
                }, 3000)
            })
    });
})