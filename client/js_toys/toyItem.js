export default class ToyItem {
    constructor(_parent, _item, _index, _deleteToy) {
        this.parent = _parent;
        this.name = _item.name;
        this.info = _item.info;
        this.category = _item.category;
        this.price = _item.price;
        this.img_url = _item.img_url;
        this.id = _item._id;
        this.index = _index;
        this.deleteToy = _deleteToy;
    }

    render() {
        let tr = document.createElement("tr");
        document.querySelector(this.parent).append(tr);
        tr.innerHTML = `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.info}</td>
    <td>${this.price} NIS</td>
    <td>${this.info}</td>
    <td><button class="bg-danger btn-close x-btn"></button></td>
    `
        let xBtn = tr.querySelector(".x-btn");
        xBtn.addEventListener("click", () => {
            window.confirm("Delete toy?") && this.deleteToy(this.id)
        })
    }


}