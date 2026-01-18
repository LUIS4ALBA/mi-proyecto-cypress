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
                sh 'npm ci || npm install'
            }
        }

       stage('Cypress Tests') {
            steps {
                echo 'Limpiando resultados anteriores y ejecutando tests...'
                // Borramos la carpeta de resultados para empezar de cero
                sh 'rm -rf cypress/results && mkdir -p cypress/results'
                // Ejecutamos Cypress
                sh 'npx cypress run --reporter mochawesome --reporter-options "reportDir=cypress/results,overwrite=false,html=false,json=true" || true'
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generando reporte unificado...'
                // IMPORTANTE: Solo unimos los archivos mochawesome-XXX.json, NO el report.json final
                sh 'npx mochawesome-merge cypress/results/mochawesome*.json > cypress/results/report.json'
                sh 'npx marge cypress/results/report.json --reportDir cypress/reports --inline'
            }
        }
    }

   post {
        always {
            script {
                try {
                    // Verificamos si el archivo existe y no está vacío antes de leerlo
                    if (fileExists('cypress/results/report.json')) {
                        def reportJson = readJSON file: 'cypress/results/report.json'
                        if (reportJson.stats.failures > 0) {
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                } catch (Exception e) {
                    echo "Aviso: No se pudo procesar el JSON de resultados: ${e.message}"
                }
            }
            archiveArtifacts artifacts: 'cypress/reports/*.html, cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}