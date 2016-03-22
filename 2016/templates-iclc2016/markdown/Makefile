all: iclc2016.pdf iclc2016.html

iclc2016.html: iclc2016.txt references.bib
	pandoc --template=pandoc/iclc.html --filter pandoc-citeproc --number-sections iclc2016.txt -o iclc2016.html

iclc2016.pdf: iclc2016.txt references.bib pandoc/iclc.latex pandoc/iclc.sty
	pandoc --template=pandoc/iclc.latex --filter pandoc-citeproc --number-sections iclc2016.txt -o iclc2016.pdf

iclc2016.docx: iclc2016.txt references.bib
	pandoc --filter pandoc-citeproc --number-sections iclc2016.txt -o iclc2016.docx

iclc2016x.pdf: iclc2016.txt references.bib pandoc/iclc.latex pandoc/iclc.sty
	pandoc --template=pandoc/iclc.latex --filter pandoc-citeproc --number-sections iclc2016.txt --latex-engine=xelatex -o iclc2016x.pdf
