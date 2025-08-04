// sistema.test.js
global.localStorage = {
    _storage: {},
    getItem(key) {
        return this._storage[key] || null;
    },
    setItem(key, value) {
        this._storage[key] = value;
    },
    clear() {
        this._storage = {};
    }
};

const {
    registrarReserva,
    __reservaData__,
} = require('../js/sistema');

// Simulamos localStorage
beforeAll(() => {
    global.localStorage = {
        store: {},
        getItem(key) {
            return this.store[key] || null;
        },
        setItem(key, value) {
            this.store[key] = value;
        },
        clear() {
            this.store = {};
        }
    };
});

beforeEach(() => {
    // Limpiamos las reservas antes de cada test
    __reservaData__.reservas.length = 0;
    localStorage.clear();
});

test('Debería registrar una reserva correctamente', () => {
    const nuevaReserva = {
        nombre: "Pedro",
        telefono: "099123456",
        email: "pedro@mail.com",
        fecha: "2025-08-10",
        horario: "10:00",
        servicioId: 1,
        barberoId: 1,
    };

    const resultado = registrarReserva(nuevaReserva);

    expect(resultado).toEqual(nuevaReserva);
    expect(localStorage.getItem('reservas')).toContain('"Pedro"');
});
