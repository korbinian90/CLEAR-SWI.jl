var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = CLEARSWI","category":"page"},{"location":"#CLEARSWI","page":"Home","title":"CLEARSWI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for CLEARSWI.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [CLEARSWI]","category":"page"},{"location":"#CLEARSWI.Data","page":"Home","title":"CLEARSWI.Data","text":"Data(mag, phase, header, TEs)\n\nDefines a struct as input for clearSWI\n\n\n\n\n\n","category":"type"},{"location":"#CLEARSWI.Options","page":"Home","title":"CLEARSWI.Options","text":"Options(;   mag_combine=:SNR,\n            mag_sens=nothing,\n            mag_softplus=true,\n            phase_unwrap=:laplacian,\n            phase_hp_σ=[4,4,0],\n            phase_scaling_type=:tanh,\n            phase_scaling_strength=4,\n            writesteps=nothing)\n\nmag_combine selects the echo combination for the magnitude. Options are \n:SNR\n:average\n:last to select the last echo\n(:CNR => (:gm, :wm)) to optimize the contrast between two selected tissues with the possible tissues classes to select in src/tissue.jl, currently only working for 7T\n(:echo => 3) to select the 3rd echo \n(:closest => 15.3) to select the echo that is closest to 15.3 ms \n(:SE => 15.3) to simulate the contrast that would be achieved using a corresponding single-echo scan with 15.3 ms echo time.\nIf mag_sens is set to an array, it is used instead of CLEAR-SWI sensitivity estimation. This can also be set to mag_sens=[1] to use the constant sensitivity of 1 and effectively avoid sensitivity correction.\nTo deactivate scaling of the combined magnitude with the softplus function, use mag_softplus=false.\nphase_unwrap is either :laplacian, :romeo, or :laplacianslice (slicewise laplacian unwrapping)\nThe phase_hp_σ is used for high-pass filtering and is given in voxel for the [x,y,z]-dimension.  \nphase_scaling_type is the scaling function to create the phase mask and can be :tanh or :negativetanh for sigmoidal filtering, or :positive, :negative, and :triangular for traditional SWI application.\nphase_scaling_strength adjusts the strength of the created phase mask. A higher phase_scaling_strength is a stronger phase appearance. With a traditional SWI phase_scaling_type it corresponds to the power or number of phase mask multiplications.\nSet writesteps to the path, where intermediate steps should be saved, e.g. writesteps=\"/tmp/clearswi_steps\". If set to nothing, intermediate steps won't be saved.\n\n\n\n\n\n","category":"type"},{"location":"#CLEARSWI.calculateSWI","page":"Home","title":"CLEARSWI.calculateSWI","text":"calculateSWI(data::Data, options::Options=Options())\n\nReturns the calculated SWI using 'data' and 'options'.\n\nExamples\n\njulia> TEs = [4,8,12]\njulia> data = Data(mag, phase, header(mag), TEs);\njulia> swi = calculateSWI(data);\n\nWith Options\n\nOptions(;   mag_combine=:SNR,\n            mag_sens=nothing,\n            mag_softplus=true,\n            phase_unwrap=:laplacian,\n            phase_hp_σ=[4,4,0],\n            phase_scaling_type=:tanh,\n            phase_scaling_strength=4,\n            writesteps=nothing)\n\nmag_combine selects the echo combination for the magnitude. Options are \n:SNR\n:average\n:last to select the last echo\n(:CNR => (:gm, :wm)) to optimize the contrast between two selected tissues with the possible tissues classes to select in src/tissue.jl, currently only working for 7T\n(:echo => 3) to select the 3rd echo\n(:closest => 15.3) to select the echo that is closest to 15.3 ms\n(:SE => 15.3) to simulate the contrast that would be achieved using a corresponding single-echo scan with 15.3 ms echo time.\nIf mag_sens is set to an array, it is used instead of CLEAR-SWI sensitivity estimation. This can also be set to mag_sens=[1] to use the constant sensitivity of 1 and effectively avoid sensitivity correction.\nTo deactivate scaling of the combined magnitude with the softplus function, use mag_softplus=false.\nphase_unwrap is either :laplacian, :romeo, or :laplacianslice (slicewise laplacian unwrapping)\nThe phase_hp_σ is used for high-pass filtering and is given in voxel for the [x,y,z]-dimension.\nphase_scaling_type is the scaling function to create the phase mask and can be :tanh or :negativetanh for sigmoidal filtering, or :positive, :negative, and :triangular for traditional SWI application.\nphase_scaling_strength adjusts the strength of the created phase mask. A higher phase_scaling_strength is a stronger phase appearance. With a traditional SWI phase_scaling_type it corresponds to the power or number of phase mask multiplications.\nSet writesteps to the path, where intermediate steps should be saved, e.g. writesteps=\"/tmp/clearswi_steps\". If set to nothing, intermediate steps won't be saved.\n\nExamples\n\njulia> TEs = [4,8,12]\njulia> data = Data(mag, phase, header(mag), TEs);\njulia> options = Options(phase_hp_σ=[10,10,5], mag_softplus=false)\njulia> swi = calculateSWI(data, options);\n\n\n\n\n\n","category":"function"},{"location":"#CLEARSWI.createIntensityProjection-Union{Tuple{T}, Tuple{AbstractArray{T, 3}, Any}, Tuple{AbstractArray{T, 3}, Any, Any}} where T","page":"Home","title":"CLEARSWI.createIntensityProjection","text":"createIntensityProjection(S::AbstractArray{T,3}, func, d=7) where T\n\nCalculates an intensity projection over the 3rd dimension of S with the function func over d slices. Good function are minimum, maximum, mean, std, ...\n\nExamples\n\njulia> using Statistics\njulia> a = rand(Float64, (64,64,20))\njulia> createIntensityProjection(a, std)\n\n\n\n\n\n","category":"method"},{"location":"#CLEARSWI.createMIP","page":"Home","title":"CLEARSWI.createMIP","text":"createMIP(S::AbstractArray{<:Number,3}, d=7)\n\nCreates minimum intensity projection of S over d slices.\n\nExamples\n\njulia> TEs = [4,8,12]\njulia> data = Data(mag, phase, header(mag), TEs);\njulia> swi = calculateSWI(data);\njulia> mip = createMIP(swi);\n\nSee also createIntensityProjection\n\n\n\n\n\n","category":"function"},{"location":"#CLEARSWI.dir-Tuple","page":"Home","title":"CLEARSWI.dir","text":"CLEARSWI.dir(path...)\n\nConstruct a path relative to SWI root.\n\nExample\n\njulia> CLEARSWI.dir(\"test\",\"testData\",\"small\",\"Mag.nii\")\n\"/home/korbinian90/.julia/dev/CLEARSWI/test/testData/small/Mag.nii\"\n\n\n\n\n\n","category":"method"},{"location":"#CLEARSWI.saveconfiguration","page":"Home","title":"CLEARSWI.saveconfiguration","text":"saveconfiguration(options::Options, path=options.writesteps)\n\nSaves the configuration in the file \"settings_swi.txt\" under path\n\n\n\n\n\n","category":"function"}]
}
