define([
    'jquery',
    'js/marionette-components',
    'docs/assets/js/bootstrap'
], function(
    $,
    MarionetteComponents
) {
    $(function() {

        // IE10 viewport hack for Surface/desktop Windows 8 bug
        //
        // See Getting Started docs for more information
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            );
            document.querySelector('head').appendChild(msViewportStyle);
        }


        var $window = $(window);
        var $body = $(document.body);

        var navHeight = $('.navbar').outerHeight(true) + 10;

        $body.scrollspy({
            target: '.bs-docs-sidebar',
            // offset: navHeight
        });

        $window.on('load', function() {
            $body.scrollspy('refresh');
        });

        $('.bs-docs-container [href=#]').click(function(e) {
            e.preventDefault();
        });

        // back to top
        setTimeout(function() {
            var $sideBar = $('.bs-docs-sidebar');

            $sideBar.affix({
                offset: {
                    top: function() {
                        var offsetTop = $sideBar.offset().top;
                        var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10);
                        var navOuterHeight = $('.bs-docs-nav').height();

                        return (this.top = offsetTop - navOuterHeight - sideBarMargin);
                    },
                    bottom: function() {
                        return (this.bottom = $('.bs-docs-footer').outerHeight(true));
                    }
                }
            });
        }, 100);

        setTimeout(function() {
            $('.bs-top').affix();
        }, 100);

        $('.bs-docs-navbar').tooltip({
            selector: 'a[data-toggle=tooltip]',
            container: '.bs-docs-navbar .nav'
        });

        $('#modalDemo').on('click', function() {
            var modal = new MarionetteComponents.Modal({
                headerViewOptions: {
                    title: 'Confirmation required'
                },

                contentViewOptions: {
                    content: '<p>Do you want to close this modal?</p>'
                },

                footerViewOptions: {
                    primaryActionText: 'Close modal',
                    secondaryActionText: 'Close modal anyway'
                },

                onPrimaryClick: function() {
                    modal.hide();
                }
            });

            modal.show();
        });
    });
});