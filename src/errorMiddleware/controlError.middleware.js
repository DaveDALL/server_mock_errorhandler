
export default (error, req, res) => {
    switch(String(error.code)[0]) {
        case "1":
            res.status(400).send({status: "error", error: error.name})
            break
        case "2":
            res.status(401).send({status: "error", error: error.name})
            break
        default:
            res.status(404).send({status: "error", error: "Error Desconocido"})
            break
    }
}