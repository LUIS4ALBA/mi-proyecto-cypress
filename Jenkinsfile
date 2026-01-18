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
                sh 'npx cypress run || true'
            }
        }
        stage('Generate Report') {
            steps {
                echo 'Generando reporte unificado...'
                // 1. Une todos los archivos JSON en uno solo
                sh 'npx mochawesome-merge cypress/results/*.json > cypress/results/report.json'
                // 2. Genera el HTML a partir del JSON unido
                sh 'npx marge cypress/results/report.json --reportDir cypress/reports --inline'
            }
    }

    post {
        always {
            echo 'Finalizando ejecución...'
            // Intentamos guardar reportes si existen
            archiveArtifacts artifacts: 'cypress/reports/*.html', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
        failure {
            echo 'Detección de fallos: Revisa el log de la consola y los videos.'
        }
    }
}