const supabase = require('../config/supabase');

/**
 * Subir el archivo a Supabase Storage
 * @param {File} file objeto que será almacenado en Supabase Storage
 * @param {String} pathImage ruta donde se guardará la imagen (sin extensión)
 * @param {String} deletePathImage URL de la imagen a eliminar (opcional)
 */
module.exports = (file, pathImage, deletePathImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Bucket en Supabase (debes crearlo en tu proyecto: ej. 'products', 'users', etc.)
            const bucketName = 'images'; // Cambia según tu bucket

            console.log('delete path', deletePathImage);

            // Eliminar imagen anterior si existe
            if (deletePathImage) {
                try {
                    // Extraer el nombre del archivo de la URL de Supabase
                    const pathParts = deletePathImage.split(`${bucketName}/`);
                    
                    if (pathParts.length > 1) {
                        const oldFileName = pathParts[1];
                        
                        const { error: deleteError } = await supabase.storage
                            .from(bucketName)
                            .remove([oldFileName]);
                        
                        if (deleteError) {
                            console.log('Error al eliminar imagen anterior:', deleteError.message);
                        } else {
                            console.log('Se borró la imagen con éxito');
                        }
                    }
                } catch (err) {
                    console.log('Failed to remove photo, error:', err);
                }
            }

            // Subir nueva imagen
            if (pathImage) {
                if (!file) {
                    return reject('Something is wrong! Unable to upload at the moment.');
                }

                const fileExt = file.originalname?.split('.').pop() || 'png';
                const fileName = `${pathImage}.${fileExt}`;
                
                const { data, error } = await supabase.storage
                    .from(bucketName)
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype || 'image/png',
                        upsert: true // Sobrescribir si ya existe
                    });

                if (error) {
                    console.log('Error al subir archivo a Supabase:', error.message);
                    return reject('Something is wrong! Unable to upload at the moment.');
                }

                // Obtener URL pública
                const { data: publicUrlData } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(fileName);

                const url = publicUrlData.publicUrl;
                console.log('URL DE SUPABASE STORAGE:', url);
                
                resolve(url);
            } else {
                reject('Path image is required');
            }
        } catch (error) {
            console.log('Error en cloud_storage:', error);
            reject('Something is wrong! Unable to upload at the moment.');
        }
    });
};
