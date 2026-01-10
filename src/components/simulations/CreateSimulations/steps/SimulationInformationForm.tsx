// src/components/simulations/steps/AddSelectionInformation.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CharacterCounterFormInput from '@/components/common/CharacterCounterFormInput';
import CharacterCounterTextarea from '@/components/common/CharacterCounterTextarea';
import { inputMaxLength } from '@/config';
import { motion } from 'framer-motion';
import { HiInformationCircle, HiLightBulb } from 'react-icons/hi2';
import SaveActionButton from '@/components/common/SaveActionButton';
import StepsHeader from './StepsHeader';
import StepInfoBox from './StepInfoBox';
import { saveToLocalStorage, saveToLocalStorageAsync, readFromLocalStorage } from '@/utils/localStorage.service'
import { newSimulationStorageName, simulation_id } from '@/utils/constants'
import { useCreateSimulation, useUpdateSimulation, useFetchSimulation  } from '@/hooks/useSimulations.hook';
import LoadingScreen from '@/components/common/LoadingScreen';

interface SimulationInfoForm {
  simulation_name: string;
  simulation_description: string;
  scenario_background: string;
  scenario_additional_details: string;
  allow_duplication: boolean;
  access_restriction: 'internal' | 'public';
}

export default function SimulationInformationForm() {
  const [isExistingSimulation, setIsExistingSimulation] = useState(false);
  const { mutate: createSimulation, isPending: isPendingToCreateNewSimulation } = useCreateSimulation();
  const { mutate: updateSimulation, isPending: isPendingToUpdateSimulation } = useUpdateSimulation();

  // Fetch simulation data from API if simulationId exists
  const searchParams = useSearchParams();
  const simulationId = searchParams.get(simulation_id);
  const { data: simulationData, isLoading: isFetchingSimulation } = useFetchSimulation(simulationId);

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<SimulationInfoForm>({
    defaultValues: {
      simulation_name: '',
      simulation_description: '',
      scenario_background: '',
      scenario_additional_details: '',
      allow_duplication: true,
      access_restriction: 'internal'
    }
  });

  // Load data from API or localStorage when component mounts or simulation data changes
  useEffect(() => {
    if (simulationData) {
      // If API returns data, use it (Priority 1)
      setIsExistingSimulation(true);
      setValue('simulation_name', simulationData.simulation_name);
      setValue('simulation_description', simulationData.simulation_description);
      setValue('scenario_background', simulationData.scenario_background);
      setValue('scenario_additional_details', simulationData.scenario_additional_details);
      setValue('allow_duplication', simulationData.allow_duplication);
      setValue('access_restriction', simulationData.access_restriction);
    } else if (!isFetchingSimulation) {
      // If no API data or no simulation ID, use localStorage (Priority 2)
      const localAccessRestriction = (readFromLocalStorage(newSimulationStorageName.simulation_access) as 'internal' | 'public') || 'internal';
      const localAllowDuplication = readFromLocalStorage(newSimulationStorageName.simulation_allow_duplication) === 'true' ? true :
        readFromLocalStorage(newSimulationStorageName.simulation_allow_duplication) === 'false' ? false : true;

      setValue('simulation_name', readFromLocalStorage(newSimulationStorageName.simulation_name) || '');
      setValue('simulation_description', readFromLocalStorage(newSimulationStorageName.simulation_description) || '');
      setValue('scenario_background', readFromLocalStorage(newSimulationStorageName.simulation_scenario_background) || '');
      setValue('scenario_additional_details', readFromLocalStorage(newSimulationStorageName.simulation_additional_details) || '');
      setValue('allow_duplication', localAllowDuplication);
      setValue('access_restriction', localAccessRestriction);
    }
  }, [simulationData, isFetchingSimulation, setValue]);


  const onSave = async () => {
    await handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: SimulationInfoForm) => {
    console.log('Form submitted:', data);

    if (isExistingSimulation && simulationId) {
      // Update existing simulation
      updateSimulation({
        simulation_id: simulationId,
        ...data
      });
    } else {
      // Create new simulation
      createSimulation(data);
    }
  };

  return (
    <div className="w-full h-full px-6 py-6 relative">
      {/* Full Screen Loading Overlay */}
      {(isPendingToCreateNewSimulation || isPendingToUpdateSimulation) && (
        <LoadingScreen message={isPendingToUpdateSimulation ? 'Updating Simulation' : 'Creating Simulation'} />
      )}

      <SaveActionButton onSave={onSave} iconPosition="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <StepsHeader
          icon={HiInformationCircle}
          title="Simulation Information"
          description="Provide basic details about your simulation scenario"
          showSimulationSelector={false}
        />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1: Simulation Name & Access Restriction */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Simulation Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl px-4 pt-3 pb-1 shadow-sm border border-gray-200"
            >
              <label htmlFor="simulation_name" className="block text-sm font-semibold text-gray-700 mb-1">
                Simulation Name <span className="text-red-500">*</span>
              </label>
              <CharacterCounterFormInput
                id="simulation_name"
                name="simulation_name"
                type="text"
                formFieldName="simulation_name"
                maxLength={inputMaxLength.simulation.title}
                placeholder="Enter simulation name"
                required={true}
                requiredMessage="Simulation name is required"
                errors={errors}
                control={control}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 outline-none ${errors.simulation_name ? 'border-red-500' : 'border-gray-300'}`}
                fontSize={16}
                onChange={(event) => {
                  saveToLocalStorage(newSimulationStorageName.simulation_name, event.target.value)
                }}
                onBlur={(event) => {
                  saveToLocalStorageAsync(newSimulationStorageName.simulation_name, event.target.value)
                }}
              />
            </motion.div>

            {/* Access Restriction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl px-4 pt-3 pb-1 shadow-sm border border-gray-200"
            >
              <label htmlFor="access_restriction" className="block text-sm font-semibold text-gray-700 mb-1">
                Access Restriction <span className="text-red-500">*</span>
              </label>
              <select
                id="access_restriction"
                {...register('access_restriction', {
                  required: 'Please select an access level',
                  onChange: (event) => {
                    saveToLocalStorage(newSimulationStorageName.simulation_access, event.target.value);
                  },
                  onBlur: (event) => {
                    saveToLocalStorageAsync(newSimulationStorageName.simulation_access, event.target.value);
                  }
                })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${errors.access_restriction ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="internal">Internal - Only within organization</option>
                <option value="public">Public - Anyone can access</option>
              </select>
              {errors.access_restriction && (
                <p className="mt-1 text-sm text-red-600">{errors.access_restriction.message}</p>
              )}
            </motion.div>
          </div>

          {/* Row 2: Description & Scenario Background */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Simulation Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl px-4 pt-3 pb-1 shadow-sm border border-gray-200"
            >
              <label htmlFor="simulation_description" className="block text-sm font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <CharacterCounterTextarea
                id="simulation_description"
                name="simulation_description"
                formFieldName="simulation_description"
                maxLength={inputMaxLength.scenario.description}
                placeholder="Briefly describe the simulation scenario"
                required={true}
                requiredMessage="Simulation description is required"
                errors={errors}
                control={control}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none outline-none ${errors.simulation_description ? 'border-red-500' : 'border-gray-300'}`}
                rows={4}
                fontSize={16}
                onChange={(event) => {
                  saveToLocalStorage(newSimulationStorageName.simulation_description, event.target.value)
                }}
                onBlur={(event) => {
                  saveToLocalStorageAsync(newSimulationStorageName.simulation_description, event.target.value)
                }}
              />
            </motion.div>

            {/* Scenario Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl px-4 pt-3 pb-1 shadow-sm border border-gray-200"
            >
              <label htmlFor="scenario_background" className="block text-sm font-semibold text-gray-700 mb-1">
                Scenario Background <span className="text-red-500">*</span>
              </label>
              <CharacterCounterTextarea
                id="scenario_background"
                name="scenario_background"
                formFieldName="scenario_background"
                maxLength={inputMaxLength.scenario.overview}
                placeholder="Provide context and background for this scenario"
                required={true}
                requiredMessage="Scenario background is required"
                errors={errors}
                control={control}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none outline-none ${errors.scenario_background ? 'border-red-500' : 'border-gray-300'}`}
                rows={4}
                fontSize={16}
                onChange={(event) => {
                  saveToLocalStorage(newSimulationStorageName.simulation_scenario_background, event.target.value)
                }}
                onBlur={(event) => {
                  saveToLocalStorageAsync(newSimulationStorageName.simulation_scenario_background, event.target.value)
                }}
              />
            </motion.div>
          </div>

          {/* Row 3: Allow Duplication Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="allow_duplication" className="block text-sm font-semibold text-gray-700">
                  Allow Duplication
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enable users to duplicate this simulation
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="allow_duplication"
                  {...register('allow_duplication', {
                    onChange: (event) => {
                      saveToLocalStorage(newSimulationStorageName.simulation_allow_duplication, String(event.target.checked));
                    },
                    onBlur: (event) => {
                      saveToLocalStorageAsync(newSimulationStorageName.simulation_allow_duplication, String(event.target.checked));
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>
          </motion.div>

          {/* Row 4: Additional Details (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-xl px-4 pt-3 pb-1 shadow-sm border border-gray-200"
          >
            <label htmlFor="scenario_additional_details" className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Details <span className="text-red-500">*</span>
            </label>
            <CharacterCounterTextarea
              id="scenario_additional_details"
              name="scenario_additional_details"
              formFieldName="scenario_additional_details"
              maxLength={inputMaxLength.scenario.related_details}
              placeholder="Add any additional information, notes, or requirements"
              required={true}
              requiredMessage="Additional details are required"
              errors={errors}
              control={control}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none outline-none ${errors.scenario_additional_details ? 'border-red-500' : 'border-gray-300'}`}
              rows={5}
              fontSize={16}
              onChange={(event) => {
                saveToLocalStorage(newSimulationStorageName.simulation_additional_details, event.target.value)
              }}
              onBlur={(event) => {
                saveToLocalStorageAsync(newSimulationStorageName.simulation_additional_details, event.target.value)
              }}
            />
          </motion.div>
        </form>

        {/* Info Box */}
        <StepInfoBox
          icon={HiLightBulb}
          heading="Tips for creating effective simulations"
          instructions={[
              "Use clear, descriptive names that reflect the scenario's purpose",
              "Provide comprehensive background information to help users understand context",
              "Include specific details that make the scenario realistic and engaging"
          ]}
          delay={0.6}
        />
      </div>
    </div>
  );
}