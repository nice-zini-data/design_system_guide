
$( document ).ready(function() {
	$("#areaSearch").on('keyup', function (e){
		if(e.keyCode == 13){
			var searchBoxListSw = false;
			$(".search_at_txt.active > ul > li").each(function (idx){
				if($(this).hasClass('on')){
					$(this).click();
					searchBoxListSw = true;
					return false;
				}
			});
			if(!searchBoxListSw){
				searchAddressToCoordinate($(this).val());
			}
		}else{
			// 방향키 아래 위 추가
			if (e.keyCode != 40 && e.keyCode != 38) {
				if(!common.isEmpty($(this).val())){
					searchAddressToKeyup($(this).val());
				}else{
					$('.areaSearch .search_at_txt').removeClass('active');
					$('.areaSearch .areaSearch_icon').removeClass('search_on');
				}
			}else{
				var sw = false;
				if (e.keyCode == 40) {
					$(".search_at_txt.active > ul > li").each(function (idx){
						if($(this).hasClass('on')){
							$(".search_at_txt.active > ul > li").eq(idx + 1).addClass("on");
							$(this).removeClass("on");
							sw = true;
							return false;
						}
					});
					if(!sw){
						$(".search_at_txt.active > ul > li").eq(0).addClass("on");
					}
				}
				if (e.keyCode == 38) {
					$(".search_at_txt.active > ul > li").each(function (idx){
						if($(this).hasClass('on')){
							$(".search_at_txt.active > ul > li").eq(idx - 1).addClass("on");
							$(this).removeClass("on");
							return false;
						}
					});
				}
			}
		}
	});

	$('#areaSearch_icon').on('click', function (e) {
		e.preventDefault();

		searchAddressToCoordinate($('#address').val());
	});

});

function searchAddressToCoordinate(address) {
	var addressSearchSw = false;

	var param = {
		query: address
		, analyze_type:"similar"
	}

	var address_name;
	var address_x;
	var address_y;

	$.ajax({
		beforeSend : function(xhr){
		},
		headers: {
			'Authorization': 'KakaoAK 24dc3b1811af6e55a95ce27b23e1bb9f'
		},
		type: "GET",
		url: 'https://dapi.kakao.com/v2/local/search/address.json',
		dataType: 'json',
		data: param,
		async:false,
		crossDomain: true
	}).done(function (response) {
		if(common.isEmpty(response.documents)){
			$.ajax({
				beforeSend : function(xhr){
				},
				headers: {
					'Authorization': 'KakaoAK 24dc3b1811af6e55a95ce27b23e1bb9f'
				},
				type: "GET",
				url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
				dataType: 'json',
				data: param,
				async:false,
				crossDomain: true
			}).done(function (response) {
				if(common.isEmpty(response.documents)){
					return alert('주소를 찾을 수 없습니다.\n정확한 주소를 입력 해주세요.');
				}else{
					addressSearchSw = true;

					address_name = response.documents[0].road_address_name;
					address_x = response.documents[0].x;
					address_y = response.documents[0].y;
				}
			}).fail(function (data, textStatus, jqXHR) {
				try {
					commonAjaxError(data, textStatus, jqXHR);
				} catch (e) {
					alert(e);
				}
			});
		}else{
			addressSearchSw = true;

			address_name = response.documents[0].address_name;
			address_x = response.documents[0].x;
			address_y = response.documents[0].y;
		}
	}).fail(function (data, textStatus, jqXHR) {
		try {
			commonAjaxError(data, textStatus, jqXHR);
		} catch (e) {
			alert(e);
		}
	});

	if(addressSearchSw){
		var data = {
			address : address_name
			, centerx : address_x
			, centery : address_y
		}
		searchAddress(data);
	}
}

function searchCoordinateToAddress(latlng, gubun) {
	mapPopClose();

	var param = {
		x: latlng.x
		, y: latlng.y
		, input_coord : 'WGS84'
		, address : latlng.address
	}

	$.ajax({
		beforeSend : function(xhr){
		},
		headers: {
			'Authorization': 'KakaoAK 24dc3b1811af6e55a95ce27b23e1bb9f'
		},
		type: "GET",
		url: 'https://dapi.kakao.com/v2/local/geo/coord2address.json',
		dataType: 'json',
		data: param,
		async:false,
		crossDomain: true
	}).done(function (response) {
		if(common.isEmpty(response.documents)){
			return alert('주소를 찾을 수 없습니다.');
		}else{
			var address = "";
			if(!common.isEmpty(param.address)){
				address = param.address;
			}else{
				address = (!common.isEmpty(response.documents[0].road_address)) ? response.documents[0].road_address.address_name : response.documents[0].address.address_name;
			}
			var data = {
				address : address
				, centerx : latlng.x
				, centery : latlng.y
			}
			searchAddressClick(data);
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
		console.log(textStatus);
		console.log(jqXHR);
	});
}

function searchAddressToKeyup(address) {
	var param = {
		query: address
		, analyze_type:"similar"
	}

	var addressList = [];
	$.ajax({
		beforeSend : function(xhr){
		},
		headers: {
			'Authorization': 'KakaoAK 24dc3b1811af6e55a95ce27b23e1bb9f'
		},
		type: "GET",
		url: 'https://dapi.kakao.com/v2/local/search/address.json',
		dataType: 'json',
		data: param,
		async:false,
		crossDomain: true
	}).done(function (response) {
		if(common.isEmpty(response.documents)){
			$.ajax({
				beforeSend : function(xhr){
				},
				headers: {
					'Authorization': 'KakaoAK 24dc3b1811af6e55a95ce27b23e1bb9f'
				},
				type: "GET",
				url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
				dataType: 'json',
				data: param,
				async:false,
				crossDomain: true
			}).done(function (response) {
				if(!common.isEmpty(response.documents)){
					// 키워드 검색
					response.documents.slice(0,10); // 목록은 10개로 제한
					response.documents.forEach(function(val, idx){
						var obj = {
							address : val.place_name
							, subAddress : (!common.isEmpty(val.road_address_name)) ? val.road_address_name : val.address_name
							, x : val.x
							, y : val.y
						}
						addressList.push(obj);
					});
				}
			}).fail(function (data, textStatus, jqXHR) {
				console.log(data);
				console.log(textStatus);
				console.log(jqXHR);
			});
		}else{

			// 주소검색
			response.documents.forEach(function(val, idx){
				var _address = "";
				var region_1depth_name = "";
				var region_2depth_name = "";
				var region_3depth_name = "";
				var _x;
				var _y;

				if(!common.isEmpty(val.road_address)){
					_address = val.road_address.address_name;
					region_1depth_name = val.road_address.region_1depth_name;
					region_2depth_name = val.road_address.region_2depth_name;
					region_3depth_name = val.road_address.region_3depth_name;
					_x = val.road_address.x;
					_y = val.road_address.y;
				}else{
					_address = val.address.address_name;
					region_1depth_name = val.address.region_1depth_name;
					region_2depth_name = val.address.region_2depth_name;
					region_3depth_name = val.address.region_3depth_name;
					_x = val.address.x;
					_y = val.address.y;
				}
				var obj = {
					address : _address
					, subAddress : region_1depth_name + " " + region_2depth_name + " " + region_3depth_name
					, x : _x
					, y : _y
				}
				addressList.push(obj);
			});
		}

	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
		console.log(textStatus);
		console.log(jqXHR);
	});

	addressList.forEach(function(val,idx){
		if(val.address.indexOf(address) > -1){
			var tmp = val.address.substring(0,val.address.indexOf(address)) + '<span class="this_txt">'+ address + '</span>' +  val.address.substring(val.address.indexOf(address) + address.length);
			val.addressHtml = tmp;
		}else{
			val.addressHtml = val.address;
		}
	});

	var addressLimit = [];
	addressList.forEach(function(val, idx){
		if(idx < 5){
			addressLimit.push(val);
		}
	});

	searchAddressList(addressLimit);

}
