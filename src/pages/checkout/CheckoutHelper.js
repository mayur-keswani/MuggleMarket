
export const FetchUserDetails = (token,cb)=>{
	return fetch('https://mugglemarket.herokuapp.com/auth-details',{
				method: 'GET',
				headers: {
				'Authorization':token||JSON.parse(localStorage.getItem('token')),
				'Content-Type': 'application/json',		
				}
			})
		.then(response=>{
			if(response.status!==200)
				throw new Error("Couldn't able to fetch details'")

			return response.json()
		})
		.then(response=>{
			console.log(response.user)
			cb(response)
		
		})
		.catch(error=>{
			console.log(error)
		})
}

export const PlaceOrder = (data,token,cb)=>{
  return fetch('https://mugglemarket.herokuapp.com/place-order',{
			method:'POST',
			body:JSON.stringify(data),
			headers:{
				'Content-Type':'application/json',
				'Authorization':token || JSON.parse(localStorage.getItem('token')),	
			}
		}).then(response=>{
			console.log(response)
			if(response.status!==200 && response.status!==201)
				throw new Error("Failed to place your order!")

			return (response.json())
		}).then(result=>{
			console.log(result);
			// onOrderPlaced({flag:true,status:"success",message:result.message})
			let message=result.message
			cb(true,message);
			// receipt_url?setInvoice(receipt_url):setInvoice("")
		}).catch(error=>{
			console.log(error)
			let message=error.message
			cb(false,message);
		})
}


export const ProcessCardPayment = (payload,token,cb) =>{
	fetch('https://mugglemarket.herokuapp.com/make-online-payment',{
			method:"POST",
			body:JSON.stringify(payload),
			headers:{
				'Content-Type':'application/json',
				'Authorization':token || JSON.parse(localStorage.getItem('token')),	
			}
		})
		.then(response=>{
			if(response.status!==200 && response.status!==201)
				throw new Error("Failed to place your order!")

			return response.json()
		})
		.then(result=>{
			console.log(result);
			cb(result)
		})
		.catch(error=>{
			console.log(error)
		})
}