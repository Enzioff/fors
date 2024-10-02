class DropZone {
    dropZone;
    statusText;
    uploadInput: HTMLInputElement;
    maxSize;

    constructor(container: Element) {
        this.dropZone = container
        this.statusText = this.dropZone.querySelector(".drop-zone__notation")
        this.uploadInput = this.dropZone.querySelector('input[type="file"]')
        this.maxSize = 10 * 1024 * 1024;
        this.init()
    }

    init() {
        this.initDropZone();
        this.initClickZone();

        ["dragover", "drop"].forEach(function (event) {
            document.addEventListener(event, function (evt) {
                evt.preventDefault()
                return false
            })
        })

        this.dropZone.addEventListener("dragenter", () => {
            this.dropZone.classList.add("_active")
        })
        this.dropZone.addEventListener("dragleave", () => {
            this.dropZone.classList.remove("_active")
        })
    }

    setStatus = (text: string, msg?: string) => {
        this.statusText.textContent = text;
        this.dropZone.classList.add('danger')

        if (msg) {
            console.error(msg)
        }

        setTimeout(() => {
            this.statusText.textContent = 'Загрузите свое резюме';
            this.dropZone.classList.remove('danger')
        }, 2000)
    }

    calculateFileSize = (size: number) => {
        const mbSize = 1_048_576;
        const text = [
            'КБ',
            'МБ',
        ]

        let finalValue = 0;

        if (size > mbSize) {
            finalValue = size / mbSize
            return `${finalValue.toFixed(2)} ${text[1]}`
        } else {
            finalValue = mbSize / size
            return `${finalValue.toFixed(2)} ${text[0]}`
        }
    }

    initClickZone = () => {
        this.dropZone.addEventListener("change", (evt: Event) => {
            this.dropZone.classList.remove("_active")
            const target = evt.target as HTMLInputElement;

            const file = target.files
            if (!file) {
                return
            }

            if (file[0].size > this.maxSize) {
                this.setStatus("Ошибка при загрузке файла",
                    `Size Error: Размер файла превышает лимит ${this.calculateFileSize(file[0].size)} / ${this.calculateFileSize(this.maxSize)}`)
                return false
            }

            if (file[0].type.startsWith("image/")) {
                this.uploadInput.files = target.files
            } else {
                this.setStatus("Ошибка при загрузке файла")
                return false
            }

            console.log(this.uploadInput.files, this.calculateFileSize(file[0].size))
        })
    }

    initDropZone = () => {
        this.dropZone.addEventListener("drop", (evt: DragEvent) => {
            evt.preventDefault();

            this.dropZone.classList.remove("_active")
            const file = evt.dataTransfer?.files[0]
            if (!file) {
                return
            }

            if (file.size > this.maxSize) {
                this.setStatus("Ошибка при загрузке файла",
                    `Size Error: Размер файла превышает лимит ${this.calculateFileSize(file.size)} / ${this.calculateFileSize(this.maxSize)}`)
                return false
            }

            if (file.type.startsWith("image/")) {
                this.uploadInput.files = evt.dataTransfer.files
            } else {
                this.setStatus("Ошибка при загрузке файла")
                return false
            }

            console.log(this.uploadInput.files, this.calculateFileSize(file.size))
        })
    }
}

export default DropZone