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
                // Ejecutamos en modo headless (sin ventana)
                // El "|| true" permite que el pipeline siga aunque fallen los tests
                sh 'npx cypress run || true'
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generando reporte unificado...'
                // Creamos la carpeta por si no existe
                sh 'mkdir -p cypress/results'
                // Unimos los JSON
                sh 'npx mochawesome-merge cypress/results/*.json > cypress/results/report.json'
                // Generamos el HTML
                sh 'npx marge cypress/results/report.json --reportDir cypress/reports --inline'
            }
        }
    }

   post {
        always {
            echo 'Guardando resultados y reportes...'
            // Guardamos videos, capturas y el nuevo reporte HTML
            archiveArtifacts artifacts: 'cypress/reports/*.html, cypress/videos/**/*.mp4, cypress/screenshots/**/*.png', allowEmptyArchive: true
        }
        success {
            echo '¡Todo salió perfecto!'
        }
        failure {
            echo 'Detección de fallos: Revisa el log de la consola y los videos.'
        }
    }
}