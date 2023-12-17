const buttons = document.querySelectorAll('.button');
const areaSaldo = document.querySelector('.screen');
const cancel = document.querySelector('.cancel');
const confirm = document.querySelector('.confirm');
const extrato = document.querySelector('.extrato')
let saldo = 100;
let areadados = [];
//let saques = [];


areaSaldo.innerHTML = `Saldo = ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

buttons.forEach((i) => {
    i.addEventListener('click', () => {
        areadados.push(i.value);
        atualizar(Number(areadados.join('')));
    }
    );

    function atualizar(x) {
        if (typeof x === 'number') {
            const valorFormatado = x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            areaSaldo.innerHTML = valorFormatado;
        } else {
            areaSaldo.innerHTML = x;
        }
    }
});


cancel.addEventListener('click', () => {
    areadados = []
    areaSaldo.innerHTML = `Saldo = ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
})


confirm.addEventListener('click', () => {
    let solicitacao = Number(areadados.join(''))
    if (solicitacao <= saldo) {
        if (solicitacao !== 0) {
            saldo -= solicitacao
            let data = new Date()
            const dia = data.getDate();
            const mes = data.getMonth() + 1; // Note que janeiro é 0, fevereiro é 1, etc.
            const ano = data.getFullYear();
            const horas = data.getHours();
            const minutos = data.getMinutes();

            let paramostrar = `${dateFormated(dia)}/${dateFormated(mes)}/${ano} ${dateFormated(horas)}:${dateFormated(minutos)}`
            areaSaldo.innerHTML = `Saque completo`;
            areadados = [];
            //saques.push(`Saque = ${solicitacao}`);
            atualizarExtrato(solicitacao, paramostrar);
            setTimeout(() => {
                areaSaldo.innerHTML = `Saldo = ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
            }, 2000)
        } else {
            areaSaldo.innerHTML = `Adicione um valor`;
            setTimeout(() => {
                areaSaldo.innerHTML = `Saldo = ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
            }, 2000)
        }
    } else {
        areaSaldo.innerHTML = `Saldo Insuficiente`;
        areadados = [];
        setTimeout(() => {
            areaSaldo.innerHTML = `Saldo = ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        }, 2000)
    }

    function atualizarExtrato(valor, paramostrar) {
        let newp = document.createElement('p');
        newp.textContent = `Saque ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} -- ${paramostrar}`
        extrato.appendChild(newp)
    }
})

function dateFormated(date) {
    return (date < 10) ? `0${date}` : date;
}


