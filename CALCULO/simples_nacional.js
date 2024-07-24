export const calcularSimplesNacional = async (campo_1, campo_2, campo_3) => {

console.log("Iniciando função de calcular o simples nacional ");
    //validador de campos
    let campo1 = parseFloat((campo_1).value.split(/\D/g).join(''));
    let campo2 = parseFloat((campo_2).value.split(/\D/g).join(''));
    let campo3 = parseFloat((campo_3).value.split(/\D/g).join(''));

    console.log("Campos");
    console.log(campo1);
    console.log(campo2);
    console.log(campo3);


    if (!isNaN(campo1)) {
      if (!isNaN(campo2)) {
        if (!isNaN(campo3)) {



          let receita_bruta_ultimos_12_meses = campo1;
          let folhafucnionario = campo2;

          let fatorR = (folhafucnionario / receita_bruta_ultimos_12_meses) * 100;

          let anexo;
          if (fatorR >= 28) {
            anexo = "III";
          } else {
            anexo = "V";
          }

          let faixa = encontrarFaixa(receita_bruta_ultimos_12_meses, anexo);

          // Verificar se a faixa foi encontrada
          if (faixa) {
            let aliquota = faixa.aliquota;
            let parcelaADeduzir = faixa.parcelaADeduzir;

            // Cálculo do valor final do Simples Nacional
            let valorMesAtual = campo3;

            let AliquotaEfetiva = ((((receita_bruta_ultimos_12_meses / 100) * aliquota) - parcelaADeduzir) / receita_bruta_ultimos_12_meses) * 100
            console.log("o calculo completo deu:")
            console.log(AliquotaEfetiva)

            console.log("Aliquota efeitva antes de ajustar:::");
            console.log(AliquotaEfetiva)

            let AliquotaEfetivaAjustada = AliquotaEfetiva.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            console.log("Aliquota efetiva depois de ajustada:::")
            console.log(AliquotaEfetivaAjustada);

            AliquotaEfetivaAjustada = AliquotaEfetivaAjustada.split(',').join('.');

            console.log('resolvendo virgula da aliquota efetiva:')
            console.log(AliquotaEfetivaAjustada);

            let valorSimples = (parseFloat(AliquotaEfetivaAjustada) * parseFloat(valorMesAtual)) / 10000;
            let valorSimplesParaCalculoFinal = (parseFloat(AliquotaEfetivaAjustada) * parseFloat(valorMesAtual)) /
            100;

            console.log("valor simples nacional: ");
            console.log(valorSimples);





            let formatadoValorSimples = valorSimples.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });

            let formatadoAliquota = aliquota.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) + "%";

            let formatadoAliquotaEfetiva = AliquotaEfetiva.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) + "%";

            let formatadoParcelaADeduzir = parcelaADeduzir.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });

            //pró-labore é sempre equivalente a 28% do valor bruto recebido no mes atual
            //inss é sempre 11% do valor do pró-labore


            console.log("iniciando calcula do irrf");
            console.log("Valor bruto do mês atual: ");
            console.log(valorMesAtual);
            let prolabore = ((valorMesAtual / 100) * 28);
            console.log("pró-labore de 28% do valor bruto do mês atual:");
            console.log(prolabore);
            let inss = ((prolabore / 100) * 11);
            console.log("INSS de 11% do valor do pró-labore:");
            console.log(inss);
            let aliquota_do_irrf_porcentagem;
            let parcela_a_deduzir_do_irrf;


            //regra da porcetagem do imposto do irrf e valor da parcela a deduzir


            if (prolabore <= 211200) {
              aliquota_do_irrf_porcentagem = 0;
              parcela_a_deduzir_do_irrf = 0;
              console.log(
                `Pró-labore maior ao igual a R$2.259,20 \n aliquota: ${aliquota_do_irrf_porcentagem} \n Parcela à deduzir do IRRF: ${parcela_a_deduzir_do_irrf} `
              );
            }
            if (prolabore > 211201 && prolabore <= 282665) {
              aliquota_do_irrf_porcentagem = 7.5;
              parcela_a_deduzir_do_irrf = 15840;
              console.log(
                `Pró-labore maior que R$2.259,21 e menor que R$2.826,65 \n aliquota: ${aliquota_do_irrf_porcentagem} \n Parcela à deduzir do IRRF: ${parcela_a_deduzir_do_irrf} `
              );
            }

            if (prolabore > 282666 && prolabore <= 375105) {
              aliquota_do_irrf_porcentagem = 15;
              parcela_a_deduzir_do_irrf = 37040;
              console.log(
                `Pró-labore maior que R$2.826,66 e menor que R$3.751,05 \n aliquota: ${aliquota_do_irrf_porcentagem} \n Parcela à deduzir do IRRF: ${parcela_a_deduzir_do_irrf} `
              );
            }

            if (prolabore > 375106 && prolabore <= 466468) {
              aliquota_do_irrf_porcentagem = 22.5;
              parcela_a_deduzir_do_irrf = 65173;
              console.log(
                `Pró-labore maior que R$3.751,06 e menor que R$4.664,68 \n aliquota: ${aliquota_do_irrf_porcentagem} \n Parcela à deduzir do IRRF: ${parcela_a_deduzir_do_irrf} `
              );
            }

            if (prolabore > 466468) {
              aliquota_do_irrf_porcentagem = 27.5;
              parcela_a_deduzir_do_irrf = 88496;
              console.log(
                `Pró-labore maior que R$4.664,68 \n aliquota: ${aliquota_do_irrf_porcentagem} \n Parcela à deduzir do IRRF: ${parcela_a_deduzir_do_irrf} `
              );
            }


            function formatarValor(valor) {
              // Dividir o valor por 100 para obter o valor real em reais e centavos
              let valorFloat = (valor / 100).toFixed(2);

              // Separar a parte inteira e a parte decimal
              let [inteira, decimal] = valorFloat.split('.');

              // Adicionar os pontos a cada três dígitos na parte inteira
              inteira = inteira.split(/\B(?=(\d{3})+(?!\d))/g).join('.');

              // Juntar a parte inteira e decimal com uma vírgula
              return inteira + ',' + decimal;
            }

            // Exemplo de uso
            let valor = 47460;
            let valorFormatado = formatarValor(valor);
            console.log(valorFormatado); // Saída: "474,60"


            //prolabore menos inss vezes aliquota do irrf menos a parcela a deduzir do irrf

            let irrf = ((((prolabore - inss) / 100) * aliquota_do_irrf_porcentagem) - parcela_a_deduzir_do_irrf);
            console.log('Valor do IRRF:');
            console.log(irrf);


            //formantando valores pra fica bonito

            let formatadoValorProlabore = (parseInt((prolabore).toString().slice(0, -2))).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });


            let formatadoValorINSS = formatarValor(inss);


            let formatadoValorIRRF = formatarValor(irrf);

            let total_de_impostos = formatarValor(valorSimplesParaCalculoFinal + inss + irrf);

            console.log(`valor vindo da variavel "valorSimples" = '${valorSimplesParaCalculoFinal}' `);


            let result = `
        <h1>Anexo ${anexo}</h1>
        <p>Fator R:  ${fatorR.toFixed(2)}%</p>
        <p>Alíquota: ${formatadoAliquota}</p>
        <p>Parcela a Deduzir: ${formatadoParcelaADeduzir}</p>
        <p>Alíquota Efetiva: ${formatadoAliquotaEfetiva}</p>
        <P>Valor do pró-labore: ${formatadoValorProlabore}</p>
        <p>Valor do Simples Nacional: ${formatadoValorSimples}</p>
        <p>Valor do INSS à pagar: R$ ${formatadoValorINSS}</p>
        <p>Valor do IRRF: R$ ${formatadoValorIRRF}</p>
        <hr />
        <p><b>Valor Total de impostos à pagar: R$ ${ total_de_impostos }</b>
      `;


      console.log("Resultado do calculo: ");
      console.log(result);
          return result;

          } else {
            console.log("A receita bruta informada não se encaixa em nenhuma faixa do anexo.");
          }


        } else {
          console.log(`Valor Valor do mês atual, Invalido "${campo3}", Por favor, Tente novamente.`);
        }
      } else {
        console.log(`Valor Folha do(s) Funcario(s)  Invalido "${campo2}", Por favor, Tente novamente.`);
      }
    } else {
      console.log(`Valor Renda Bruta Invalido "${campo1}", Por favor, Tente novamente.`);
    }
  }







  function encontrarFaixa(receita_bruta_ultimos_12_meses, anexo) {
    if (anexo === "III") {
      // Faixas do Anexo III
      if (receita_bruta_ultimos_12_meses <= 18000000) {
        return {
          aliquota: 6,
          parcelaADeduzir: 0
        };
      } else if (receita_bruta_ultimos_12_meses > 18000001 && receita_bruta_ultimos_12_meses <= 36000000) {
        return {
          aliquota: 11.2,
          parcelaADeduzir: 936000
        };
      } else if (receita_bruta_ultimos_12_meses > 36000001 && receita_bruta_ultimos_12_meses <= 72000000) {
        return {
          aliquota: 13.5,
          parcelaADeduzir: 1764000
        };
      } else if (receita_bruta_ultimos_12_meses > 72000001 && receita_bruta_ultimos_12_meses <= 180000000) {
        return {
          aliquota: 16,
          parcelaADeduzir: 3564000
        };
      } else if (receita_bruta_ultimos_12_meses > 180000001 && receita_bruta_ultimos_12_meses <= 360000000) {
        return {
          aliquota: 21,
          parcelaADeduzir: 12564000
        };
      } else if (receita_bruta_ultimos_12_meses > 360000001 && receita_bruta_ultimos_12_meses <= 480000000) {
        return {
          aliquota: 33,
          parcelaADeduzir: 64800000
        };
      }
    } else if (anexo === "V") {
      // Faixas do Anexo V
      if (receita_bruta_ultimos_12_meses <= 18000000) {
        return {
          aliquota: 15.5,
          parcelaADeduzir: 0
        };
      } else if (receita_bruta_ultimos_12_meses > 18000001 && receita_bruta_ultimos_12_meses <= 36000000) {
        return {
          aliquota: 18,
          parcelaADeduzir: 450000
        };
      } else if (receita_bruta_ultimos_12_meses > 36000001 && receita_bruta_ultimos_12_meses <= 72000000) {
        return {
          aliquota: 19.5,
          parcelaADeduzir: 990000
        };
      } else if (receita_bruta_ultimos_12_meses > 72000001 && receita_bruta_ultimos_12_meses <= 180000000) {
        return {
          aliquota: 20.5,
          parcelaADeduzir: 1710000
        };
      } else if (receita_bruta_ultimos_12_meses > 180000001 && receita_bruta_ultimos_12_meses <= 360000000) {
        return {
          aliquota: 23,
          parcelaADeduzir: 621000000
        };
      } else if (receita_bruta_ultimos_12_meses > 360000001 && receita_bruta_ultimos_12_meses <= 4800000) {
        return {
          aliquota: 30.5,
          parcelaADeduzir: 5400000000
        };
      }
    }
    // Se nenhuma faixa for encontrada, retornar undefined
    return undefined;
  }



