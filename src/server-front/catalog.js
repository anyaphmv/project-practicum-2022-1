export function catalogRenderData() {
	return function init(items, {
		page = 1,
		limit = 6,
		sort = 'alp',
		filter = ''
	}) {

		const filterData = filterFunc([...items], filter);
		const sortData = sortFunc(filterData, sort);
		console.log(sortData)
		return  {
			pagination: pagination(sortData, page, limit),
			pageCount: pageCount(items.length, limit),
		};
	}

	function filterFunc(items, filter) {
		if ( !filter ) {
			return items;
		}
	}

	function sortFunc(items, sort) {
		return items;
	}

	function pagination(items, page, limit) {
		return items.splice( (page - 1) * limit, limit );
	}

	function pageCount(itemsLength, limit) {
		return Math.ceil(itemsLength / limit);
	}
}
