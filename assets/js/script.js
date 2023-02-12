"use strict"


document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('#apply');
    var table = document.getElementById('orderTable');
    var tr = table.getElementsByTagName('tr');
    var sortRadio = document.getElementsByName('sort');
    var i, tdStatus, orderMin, orderMax, arrayStatus = [];

    for (i = 1; i < tr.length; i++) {

        tdStatus = tr[i].getElementsByTagName('td')[3].innerHTML;
        if (!(orderMin < tr[i].getElementsByTagName('td')[2].innerHTML * 1) && tr[i].getElementsByTagName('td')[2].innerHTML !== '') {
            orderMin = tr[i].getElementsByTagName('td')[2].innerHTML * 1;
        }
        if (!(orderMax > tr[i].getElementsByTagName('td')[2].innerHTML * 1)) {
            orderMax = tr[i].getElementsByTagName('td')[2].innerHTML * 1;
        }

        if (arrayStatus.indexOf(tdStatus) == -1) {

            arrayStatus.push(tdStatus);
            var option = document.createElement("option");
            option.setAttribute("value", tdStatus);
            option.innerHTML = tdStatus;


            document.getElementById("statusSelect").appendChild(option);
        }
    }
    document.getElementById('orderInputFrom').setAttribute('min', orderMin);

    document.getElementById('orderInputTo').setAttribute('max', orderMax);


    button.addEventListener('click', function () {
        var tdLogin, tdOrder, tdStatus, filterLogin, filterOrderFrom, filterOrderTo, filterSelect, filterVariant, i,
            flagDisplay;
        filterLogin = document.getElementById('loginInput').value.toUpperCase();
        filterOrderFrom = document.getElementById('orderInputFrom').value == '' ? false : document.getElementById('orderInputFrom').value * 1;
        filterOrderTo = document.getElementById('orderInputTo').value == '' ? false : document.getElementById('orderInputTo').value * 1;
        filterSelect = document.getElementById("statusSelect").value;
        filterVariant = document.querySelector('input[name="variant"]:checked').value == 'true' ? true : false;

        for (i = 1; i < tr.length; i++) {

            if (filterLogin || filterOrderFrom || filterOrderTo || filterSelect) {
                if (filterVariant) {
                    flagDisplay = false;
                } else {
                    flagDisplay = true;
                }
            } else {
                tr[i].style.display = '';
                continue;
            }

            tdLogin = tr[i].getElementsByTagName('td')[1].innerHTML.toUpperCase();
            tdOrder = tr[i].getElementsByTagName('td')[2].innerHTML * 1;
            tdStatus = tr[i].getElementsByTagName('td')[3].innerHTML;

            if (filterLogin && tdLogin && tdLogin.indexOf(filterLogin) >= 0) {
                if (filterVariant) {
                    flagDisplay = true;
                }
            } else if (!filterVariant && filterLogin && tdLogin) {
                flagDisplay = false;
            }


            if (tdOrder) {
                if (filterOrderFrom !== false && filterOrderTo !== false) {
                    if (filterOrderFrom < filterOrderTo) {
                        if (tdOrder >= filterOrderFrom && tdOrder <= filterOrderTo) {
                            if (filterVariant) {
                                flagDisplay = true;
                            }
                        } else {
                            if (!filterVariant) {
                                flagDisplay = false;
                            }
                        }
                    } else {
                        if (tdOrder <= filterOrderFrom && tdOrder >= filterOrderTo) {
                            if (filterVariant) {
                                flagDisplay = true;
                            }
                        } else {
                            if (!filterVariant) {
                                flagDisplay = false;
                            }
                        }
                    }

                } else if (filterOrderFrom) {
                    if (tdOrder >= filterOrderFrom) {
                        if (filterVariant) {
                            flagDisplay = true;
                        }
                    } else {
                        if (!filterVariant) {
                            flagDisplay = false;
                        }
                    }
                } else if (filterOrderTo) {
                    if (tdOrder <= filterOrderTo) {
                        if (filterVariant) {
                            flagDisplay = true;
                        }
                    } else {
                        if (!filterVariant) {
                            flagDisplay = false;
                        }
                    }
                }
            } else {
                if (!filterVariant) {
                    flagDisplay = false;
                }
            }

            if (tdStatus && filterSelect) {
                if (tdStatus == filterSelect) {
                    if (filterVariant) {
                        flagDisplay = true;
                    }
                } else {
                    if (!filterVariant) {
                        flagDisplay = false;
                    }
                }
            }

            if (flagDisplay) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }

    });

    function sortTable(sort, column, type) {
        if (type === 'integer') {
            if (sort === 'asc') {
                var sortedRows = Array.from(table.rows).slice(1).sort((a, b) => a.cells[column].innerHTML * 1 > b.cells[column].innerHTML * 1 ? 1 : -1);
            } else {
                var sortedRows = Array.from(table.rows).slice(1).sort((a, b) => a.cells[column].innerHTML * 1 < b.cells[column].innerHTML * 1 ? 1 : -1);
            }
        } else {
            if (sort === 'asc') {
                var sortedRows = Array.from(table.rows).slice(1).sort((a, b) => a.cells[column].innerHTML > b.cells[column].innerHTML ? 1 : -1);
            } else {
                var sortedRows = Array.from(table.rows).slice(1).sort((a, b) => a.cells[column].innerHTML < b.cells[column].innerHTML ? 1 : -1);
            }
        }

        table.tBodies[0].append(...sortedRows);
    }

    sortRadio.forEach((elem) => {
        elem.addEventListener('click', function () {
            var value = document.querySelector('input[name="sort"]:checked').value;
            var column, type, sort;
            switch (value) {
                case 'numberAsc':
                    sort = 'asc'
                    column = 0;
                    type = 'integer';
                    break;
                case 'numberDesc':
                    sort = 'desc'
                    column = 0;
                    type = 'integer';
                    break;
                case 'loginAsc':
                    sort = 'asc'
                    column = 1;
                    type = 'string';
                    break;
                case 'loginDesc':
                    sort = 'desc'
                    column = 1;
                    type = 'string';
                    break;
                case 'orderAsc':
                    sort = 'asc'
                    column = 2;
                    type = 'integer';
                    break;
                case 'orderDesc':
                    sort = 'desc'
                    column = 2;
                    type = 'integer';
                    break;
                case 'statusAsc':
                    sort = 'asc'
                    column = 3;
                    type = 'string';
                    break;
                case 'statusDesc':
                    sort = 'desc'
                    column = 3;
                    type = 'string';
                    break;
            }

            sortTable(sort, column, type);
        })
    })

})
;
