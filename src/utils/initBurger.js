export function initBurger() {
	const burger = document.getElementById("burger")
    const nav = document.getElementById("main-nav")

	burger.addEventListener("click", function(e){
  		this.classList.toggle("is-open");
		nav.classList.toggle("is-open");
	});
}
