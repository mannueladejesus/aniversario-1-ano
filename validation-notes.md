# Validação final — 14/08/2026

- Build de produção concluído com sucesso via `pnpm run build`.
- Em mobile (390x844), a capa renderiza o nome visível como **Manuella**; a imagem permanece proporcional, sem cortar a criança, asas ou cenário.
- A capa de abertura corrigida também exibe visualmente **Manuella** no topo da arte, sem o sobrenome.
- Em desktop preview, a segunda página mostra a imagem vertical integral com Manuella, asas, borboleta e texto baked-in; não há cards textuais cobrindo a arte.
- O botão de retorno aparece no canto superior esquerdo, separado do conteúdo principal; o botão de WhatsApp fica na região inferior direita, fora do texto central e da borboleta.
- O controle de música permanece disponível durante a navegação.
- Os metadados HTML usam `Convite da Manuella — Jardim Encantado`, descrição sem sobrenome e a capa pública como imagem Open Graph/Twitter.
- Observação: o preview de gestão mostra a faixa “Preview mode”; ela não faz parte do convite publicado.
- Próximo passo: salvar checkpoint final, sincronizar o commit com o repositório GitHub e entregar os links públicos.

## Limites da auditoria

A validação de prévia Open Graph foi conferida no HTML-fonte e no asset configurado; a confirmação definitiva do card renderizado pelo WhatsApp depende do cache do próprio WhatsApp e pode exigir compartilhar novamente o link ou usar um depurador de compartilhamento.

## Histórico técnico

O slug do projeto e nomes históricos de arquivos ainda contêm `mannuela` por compatibilidade técnica, mas não aparecem como texto visível ao convidado. A grafia exibida em textos, metadados e na capa foi corrigida para `Manuella`.

## Style Decisions

- A grafia oficial da aniversariante é sempre **Manuella**: um `n` e dois `l`.
- A capa de abertura deve preservar a composição original e alterar somente a grafia incorporada.
- A segunda página permanece uma imagem integral com apenas os controles interativos sobrepostos.

