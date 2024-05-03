class App {
  constructor() {
    this.filterByDriver = document.getElementById("driver");
    this.filterByDate = document.getElementById("filterDate");
    this.filterByTime = document.getElementById("filterTime");
    this.filterByCapacity = document.getElementById("filterCapacity");
    this.btnSearch = document.getElementById("btn-search");
    this.btnClear = document.getElementById("btn-clear");
    this.carContainerList = document.getElementById("carContainerList");
    this.countResult = document.getElementById("count-result");
  }

  async init() {
    // Register click listener
    this.btnClear.onclick = () => {
      this.clearForm();
      this.clearNode();
      this.countResult.innerHTML = "";
    };

    this.btnSearch.onclick = () => {
      let driverTypeValue = this.filterByDriver.value == 'true';
      let dateValue = this.filterByDate.value;
      let newDate = new Date(dateValue);
      let timeValue = this.filterByTime.value;
      let capacityValue = this.filterByCapacity.value;

      if (driverTypeValue == null) {
        alert("Harap masukkan tipe driver");
        return;
      } else if (dateValue == "") {
        alert("Harap masukkan tanggal");
        return;
      } else if (newDate.getDate() < this.dateNow()) {
        alert("Harap memilih tanggal yang akan datang");
        return;
      } else if (timeValue == "") {
        alert("Harap masukkan waktu");
        return;
      } else {
        this.getCarByFilter(driverTypeValue, newDate.toLocaleDateString(), parseInt(timeValue), parseInt(capacityValue));
      }
    };
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-sm-12", "col-lg-6", "col-xl-4", "mt-2", "d-flex", "align-items-stretch");
      node.innerHTML = car.render();
      this.carContainerList.appendChild(node);
    });
  };

  async getCarByFilter(driverType, date, time, capacity) {
    this.clearNode();
    let data = await Binar.listCars(
      (car) =>
        car.available === true &&
        car.driverType === driverType &&
        (car.capacity >= capacity || 1) &&
        car.availableAt.toLocaleDateString() >= date &&
        car.availableAt.getHours() >= time
    );

    Car.init(data);

    this.countResult.innerHTML = `<h3>Hasil : ${data.length} mobil ditemukan</h3>`;

    this.run();
  }

  clearForm = () => {
    this.filterByDriver.value = "";
    this.filterByDate.value = "";
    this.filterByTime.value = "";
    this.filterByCapacity.value = "";
  };

  clearNode = () => {
    let child = this.carContainerList.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerList.firstElementChild;
    }
  };

  dateNow = () => {
    let today = new Date().getDate();
    return today;
  };
}
