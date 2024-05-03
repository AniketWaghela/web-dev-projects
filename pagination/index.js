function getPageList(totalPages, Page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sidewidth = maxLength < 9 ? 1 : 2;
    var leftwidth = (maxLength - sidewidth * 2 - 3) >> 1;
    var rigthwidth = (maxLength - sidewidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sidewidth - 1 - rigthwidth) {
        return range(1, maxLength - sidewidth - 1).concat(0, range(totalPages - sidewidth + 1, totalPages));
    }

    if (page >= totalPages - sidewidth - 1 - rigthwidth) {
        return range(1, sidewidth).concat(0, range(totalPages - sidewidth - 1 - rigthwidth - leftwidth, totalPages));
    }

    return range(1, sidewidth).concat(0, range(page - leftwidth, page + rigthwidth), 0, range(totalPages - sidewidth + 1, totalPages));
}

$(function () {
    var numerOfItems = $(".card-content .card").length;
    var limitPerPage = -1; // ketla card page per dekhase 
    var totalPages = Math.ceil(numerOfItems / limitPerPage);
    var paginationSize = 2; //
    var currentPage;

    function showPage(whichPage) {
        if (WhichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }

    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
    );

    $(".card-content").show();
    showPage(2);
});
