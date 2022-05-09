const sts = document.querySelectorAll(".js_star");
sts.forEach((star) => {
	star.addEventListener("click", () => {
		if (localStorage.getItem("IDuser")) {
			const valueRatings = star.dataset.value;
			const vstar = star.dataset.star;
			const Idu = localStorage.getItem("IDuser");
			const Idb = localStorage.getItem("id_book");
			console.log(`
                        IDu: ${Idu}
                        IDb: ${Idb}
                        valueRating: ${valueRatings}`);
			alert(`You have successfully rated the product ${vstar} star !!!`);
		} else {
			alert("Please login before rating the product!!");
		}
	});
});
