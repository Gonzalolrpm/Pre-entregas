// Variable global p
let resultado = 0;

// Función principal del simulador
function simulador() {
    console.log("Puedes realizar operaciones aritméticas.");

    // Bucle principal
    while (true) {
        // Mostrar el resultado actual
        console.log(`Resultado actual: ${resultado}`);

        // Obtener la operación del usuario
        const operacion = prompt("Ingresa una operación (+, -, *, /) o 'salir' para finalizar:");

        // Salir del bucle si el usuario ingresa "salir"
        if (operacion.toLowerCase() === "salir") {
            console.log("Simulador Interactivo: Hasta luego. ¡Que tengas un buen día!");
            break;
        }

        // Verificar si la operación es válida y realizar el cálculo
        if (operacion === "+" || operacion === "-" || operacion === "*" || operacion === "/") {
            const numero = parseFloat(prompt("Ingresa un número:"));

            // Realizar la operación correspondiente
            switch (operacion) {
                case "+":
                    resultado += numero;
                    break;
                case "-":
                    resultado -= numero;
                    break;
                case "*":
                    resultado *= numero;
                    break;
                case "/":
                    if (numero !== 0) {
                        resultado /= numero;
                    } else {
                        console.log("No puedes dividir por cero. Inténtalo de nuevo.");
                    }
                    break;
                default:
                    console.log("Operación no válida. Inténtalo de nuevo.");
            }
        } else {
            console.log("Operación no válida. Inténtalo de nuevo.");
        }
    }
}

// Llamada a la función principal del simulador
simulador();
