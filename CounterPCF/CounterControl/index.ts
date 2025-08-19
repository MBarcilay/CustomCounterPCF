// Importa las interfaces de entrada y salida generadas automáticamente
import { IInputs, IOutputs } from "./generated/ManifestTypes";

// Clase principal del control personalizado de contador
export class CounterControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Elemento contenedor principal donde se renderiza el control
    private container: HTMLDivElement;
    // Etiqueta que muestra el valor actual del contador
    private label: HTMLLabelElement;
    // Botón para incrementar el contador
    private plusButton: HTMLButtonElement;
    // Botón para decrementar el contador
    private minusButton: HTMLButtonElement;
    // Valor actual del contador
    private counter = 0;
    // Función para notificar que la salida ha cambiado
    private notifyOutputChanged!: () => void;

    /**
     * Inicializa el control y crea los elementos visuales.
     * @param context Contexto del framework con parámetros de entrada
     * @param notifyOutputChanged Función para notificar cambios de salida
     * @param state Estado persistente del control
     * @param container Elemento contenedor donde se renderiza el control
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        // Guarda el contenedor y la función de notificación
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;

        // Crea la etiqueta para mostrar el valor del contador
        this.label = document.createElement("label");
        this.label.innerText = this.counter.toString();
        this.label.style.margin = "10px";

        // Crea el botón para incrementar el contador
        this.plusButton = document.createElement("button");
        this.plusButton.innerText = "+";
        this.plusButton.onclick = () => {
            this.counter++;
            this.label.innerText = this.counter.toString();
            this.notifyOutputChanged(); // Notifica que el valor cambió
        };

        // Crea el botón para decrementar el contador
        this.minusButton = document.createElement("button");
        this.minusButton.innerText = "-";
        this.minusButton.onclick = () => {
            this.counter--;
            this.label.innerText = this.counter.toString();
            this.notifyOutputChanged(); // Notifica que el valor cambió
        };

        // Agrega los elementos al contenedor en el orden: botón -, etiqueta, botón +
        this.container.appendChild(this.minusButton);
        this.container.appendChild(this.label);
        this.container.appendChild(this.plusButton);
    }

    /**
     * Actualiza la vista del control cuando cambian los parámetros de entrada.
     * @param context Contexto con los parámetros actualizados
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Obtiene el nuevo valor del contador desde los parámetros
        const newValue = context.parameters.counterValue.raw;
        // Si el valor es válido y diferente, actualiza el contador y la etiqueta
        if (newValue !== null && newValue !== undefined && newValue !== this.counter) {
            this.counter = newValue;
            this.label.innerText = this.counter.toString();
        }
    }

    /**
     * Devuelve el valor actual del contador como salida del control.
     * @returns Objeto IOutputs con el valor del contador
     */
    public getOutputs(): IOutputs {
        return { counterValue: this.counter };
    }

    public destroy(): void {
        // Cleanup if needed
    }
}
