class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    driverType,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.driverType = driverType;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="card p-4" style="min-width: 390px; width:100%">
      <img src="${this.image}" alt="" class="rounded object-fit-cover" height="200px" width="100%">
      <p class="mt-4 fs-4">${this.model}/${this.manufacture}</p>
      <p class="fw-bold fs-6">Rp${this.rentPerDay}/hari</p>
      <p>${this.description}</p>
      <div class="mt-auto">
        <p><i class="bi bi-people"></i> ${this.capacity} Orang</p>
        <p><i class="bi bi-people"></i> ${this.transmission}</p>
        <p><i class="bi bi-people"></i> ${this.year}</p>
      </div>
      <button class="btn btn-success mt-auto">Pilih Mobil</button>
    </div>
`;
  }
}
