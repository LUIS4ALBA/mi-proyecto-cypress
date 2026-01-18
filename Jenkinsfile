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
                echo 'Ejecutando pruebas de Cypress...'
                // Ejecutamos y permitimos que continúe para generar el reporte
                sh 'npx cypress run --reporter mochawesome --reporter-options "reportDir=cypress/results,overwrite=false,html=false,json=true" || true'
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generando reporte unificado...'
                // Creamos la carpeta por si no existe
                sh 'mkdir -p cypress/results'
                sh 'npx mochawesome-merge cypress/results/*.json > cypress/results/report.json'
                sh 'npx marge cypress/results/report.json --reportDir cypress/reports --inline'
            }
        }
    }

   post {
        always {
            echo 'Publicando Reporte...'
            archiveArtifacts artifacts: 'cypress/reports/*.html, cypress/videos/**/*.mp4', allowEmptyArchive: true
            
            // --- ESTE ES EL TRUCO ---
            script {
                // Leemos el JSON del reporte para ver si hay fallos
                def reportJson = readJSON file: 'cypress/results/report.json'
                def stats = reportJson.stats
                
                if (stats.failures > 0) {
                    // Si hay fallos, marcamos el build como UNSTABLE (Amarillo)
                    // Esto indica que el Pipeline terminó, pero los tests fallaron
                    currentBuild.result = 'UNSTABLE'
                    echo "Se detectaron ${stats.failures} fallos en los tests."
                }
            }
        }
    }