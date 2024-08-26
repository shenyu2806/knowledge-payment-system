export const mixin = {
	methods:{
		//等级
		courseType(courseLevel){
			let value = ''
			if(courseLevel == 0){
				value = '初级'
			}else if(courseLevel == 1){
				value = '中级'
			}else if(courseLevel == 2){
				value = '高级'
			}
			return value;
		},
		 //数字改变（加万位）
		courseNumber(value){
		    const newValue = ['', '', '']
		    let fr = 1000
		    let num = 3
		    let text1 = ''
		    let fm = 1
		    while (value / fr >= 1) {
		      fr *= 10
		      num += 1
		      // console.log('数字', value / fr, 'num:', num)
		    }
		  if (num <= 8) { // 万
		      text1 = parseInt(num - 4) / 3 > 1 ? '千万' : 'W'
		      // tslint:disable-next-line:no-shadowed-variable
		      fm = text1 === 'W' ? 10000 : 10000000
		      if (value % fm === 0) {
		        newValue[0] = parseInt(value / fm) + ''
		      } else {
		        newValue[0] = parseFloat(value / fm).toFixed(2) + ''
		      }
		      newValue[1] = text1
		    }
		    if (value < 1000) {
		      newValue[0] = value + ''
		      newValue[1] = ''
		    }
		    return newValue.join('')
		},
		getHeight(HeaderSearch,HomeTbas){
			let searchHeigth = 0;
			let tbasHeigth = 0;
			let heigh = 0;
			if(HeaderSearch){
				//header-search高度
				let serchView = uni.createSelectorQuery().select(HeaderSearch)
				serchView.boundingClientRect(data => {
					searchHeigth = data.height;
				}).exec();
			}
			if(HomeTbas){
				//home-tabs高度
				let tabs = uni.createSelectorQuery().select(HomeTbas)
				tabs.boundingClientRect(data => {
					tbasHeigth = data.height;
				}).exec();
			}
			uni.getSystemInfo({
				success(res) {
					heigh = res.windowHeight - searchHeigth - tbasHeigth;
				}
			})
			return heigh;
		},
		loginto(ops,email){
			let ster = 0
			if (email == null) {
				ster = 1
			}
			const emailRegex =/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
			const emailRe = emailRegex.test(email);
			if (ops == 0) {
				ster = 2
			}else if(emailRe == false){
				ster = 3
			}
			return ster
		}
	}
}