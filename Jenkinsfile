pipeline {
    agent any

    // Esto le dice a Jenkins que use el Node que configuramos en el Paso 1
    tools {
        nodejs 'node25' 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                // Usamos ci en lugar de install para ambientes de CI/CD (es más limpio)
                sh 'npm install'
            }
        }

      stage('Cypress Tests') {
            steps {
                echo 'Limpiando resultados anteriores y ejecutando tests...'
                sh 'rm -rf cypress/results && mkdir -p cypress/results'
                
                // catchError: Si npx cypress run falla, el stage se pone AMARILLO, 
                // pero el pipeline NO se detiene.
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                    sh 'npx cypress run --reporter mochawesome --reporter-options "reportDir=cypress/results,overwrite=false,html=false,json=true"'
                }
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generando reporte unificado...'
                sh 'npx mochawesome-merge cypress/results/mochawesome*.json > cypress/results/report.json'
                sh 'npx marge cypress/results/report.json --reportDir cypress/reports --inline'
            }
        }
    }

   post {
        always {
            script {
                try {
                    // Leemos el resumen del archivo JSON
                    def report = readJSON file: 'cypress/results/report.json'
                    def s = report.stats
                    
                    echo "**********************************************"
                    echo "   RESUMEN DE EJECUCIÓN DE CYPRESS"
                    echo "   Tests Totales: ${s.tests}"
                    echo "   Pasados:       ${s.passes}"
                    echo "   Fallidos:      ${s.failures}"
                    echo "   Duración:      ${(s.duration / 1000).round(2)} segundos"
                    echo "**********************************************"
                    
                } catch (Exception e) {
                    echo "No se pudo generar el resumen en consola (¿faltan tests?)"
                }
            }
            archiveArtifacts artifacts: 'cypress/reports/*.html, cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}